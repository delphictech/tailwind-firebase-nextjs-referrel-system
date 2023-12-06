import { auth } from "@/app/auth/config";
import { CollectionTypes, fetchCollection, mutateCollection } from "@/app/lib/firebase";
import { Event } from "@/types/event";
import { Timestamp } from "firebase-admin/firestore";

const generateRandomTimestampWithinDays = (days: number): Timestamp => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  
    // Generate a random number of milliseconds within the specified range
    const randomMilliseconds = Math.floor(Math.random() * (days * 24 * 60 * 60 * 1000));
  
    // Apply the random number of milliseconds to the future date
    const randomDate = new Date(futureDate.getTime() + randomMilliseconds);
    return Timestamp.fromDate(randomDate);
};

/**
 * Function will get a random element from the passed list
 *
 * @template T
 * @param {T[]} elementList
 * @return {*}  {T}
 */
const getRandomElement = <T>(elementList: T[]): T => {
    if (elementList.length === 0) throw Error("getRandomElement: no items in list");
    const randomIndex = Math.floor(Math.random() * elementList.length);
    return elementList[randomIndex];
};

/**
 * Generates a random number in the range
 *
 * @param {number} min
 * @param {number} max
 * @return {*}  {number}
 */
const getRandomNumber = (min: number, max: number): number => {
    // Ensure that min is less than or equal to max
    if (min > max) {
      [min, max] = [max, min];
    }
    return Math.random() * (max - min) + min;
};

/**
 * Will generate a fake event
 *
 * @param {string[]} hostIDs
 * @return {*} 
 */
const createFakeEvent = async (hostID: string, writeToFirebase = false) => {
    const eventTypes: Event["type"][] = ["mlp-teams", "singles", "doubles", "mix-n-match", "training", "pickup"];
    const nouns: string[] = ["Thunder", "Phoenix", "Cascade", "Ripple", "Harmony", "Zenith", "Pinnacle", "Aurora", "Nova", "Summit"];
    const locations: string[] = ["Meadow", "Boston", "Oasis", "Haven", "Serenity", "Horizon", "Crescent", "Quasar", "Eclipse", "Vortex", "Lagoon"];
    const eventName: string[] = ["Classic", "Championship", "Showdown", "Extravaganza", "Showcase", "Spectacle", "Gala", "Tournament", "Challenge", "Jamboree"];

    const event: Required<Event> & { fake: true } = {
        link: "#",
        name: `${getRandomElement(nouns)} ${getRandomElement(locations)} ${getRandomElement(eventName)}`,
        timestamp: generateRandomTimestampWithinDays(15),
        type: getRandomElement(eventTypes),
        description: "Not generated yet",
        price: getRandomNumber(100, 3500),
        points: getRandomNumber(100, 3500),
        hostID,
        location: {
            name: `${getRandomElement(locations)}, MA`,
            longitude: 150,
            latitude: 150,
        },
        fake: true,
    };

    // write to firebase
    if (writeToFirebase) {
        const firebaseEvent = await mutateCollection("events").add(event);
        console.log(`Wrote document ${firebaseEvent.id}`);
    };

    return event;
};

export /**
 * Function will create all of the fake events
 *
 * @param {number} [number=10]
 */
const createFakeEvents = async (number = 10, writeToFirebase = false) => {
    // check that the user has permissions
    const session = await auth();
    if (!session?.user?.email) throw Error("Creating fake events: user is not authenticated");

    // get the first 10 fake users
    // depends on how many competitions they want to make
    const existingUsersSnapshot = await fetchCollection("users").limit(number > 5 ? Math.floor(number / 2) : 4).get();
    if (existingUsersSnapshot.size === 0) throw Error("Creating fake events: No users in the database");
    const userDataList = existingUsersSnapshot.docs.map((userDoc) => ({ ...userDoc.data(), id: userDoc.id }));

    // fetch fake data for events, promise.all
    const fakeEventPromises = Array.from({ length: number }, () => createFakeEvent(getRandomElement(userDataList).id, writeToFirebase));
    const fakeEvents = await Promise.all(fakeEventPromises);

    return fakeEvents;
};


export /**
 * Function will delete all the fake events
 *
 */
const deleteFakeData = async (collectionName: keyof CollectionTypes) => {
    // fetch alll the fake events
    const eventSnapshots = await fetchCollection(collectionName).where("fake", "==", true).get();
    const deletePromises = eventSnapshots.docs.map(async (doc) => {
        doc.ref.delete();
        console.log(`Deleted document ${doc.id} from ${collectionName} collection`);
    });
    const deletedDocs = await Promise.all(deletePromises);

    return deletedDocs;
};