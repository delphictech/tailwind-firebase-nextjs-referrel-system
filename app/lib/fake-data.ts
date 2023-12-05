import { auth } from "@/app/auth/config";
import { fetchCollection } from "@/app/lib/firebase";
import { Event } from "@/types/event";

const generateRandomDateWithinDays = (days: number): Date => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  
    // Generate a random number of milliseconds within the specified range
    const randomMilliseconds = Math.floor(Math.random() * (days * 24 * 60 * 60 * 1000));
  
    // Apply the random number of milliseconds to the future date
    const randomDate = new Date(futureDate.getTime() + randomMilliseconds);
  
    return randomDate;
};

const getRandomElement = <T>(elementList: T[]): T => {
    if (elementList.length === 0) throw Error("getRandomElement: no items in list");
    const randomIndex = Math.floor(Math.random() * elementList.length);
    return elementList[randomIndex];
};

const getRandomNumber = (min: number, max: number): number => {
    // Ensure that min is less than or equal to max
    if (min > max) {
      [min, max] = [max, min];
    }
    return Math.random() * (max - min) + min;
};

const createFakeEvent = async (hostIDs: string[]) => {
    const eventTypes: Event["type"][] = ["mlp-teams", "singles", "doubles", "mix-n-match", "training", "pickup"];

    const event: Required<Event> = {
        registrationLink: "/",
        name: "",
        date: generateRandomDateWithinDays(15),
        type: getRandomElement(eventTypes),
        description: "",
        price: getRandomNumber(100, 3500),
        points: getRandomNumber(100, 3500),
        hostID: getRandomElement(hostIDs),
        location: {
            name: "Boston, MA",
            longitude: 150,
            latitude: 150,
        }
    };

    return event;
};

export /**
 * Function will create all of the fake events
 *
 * @param {number} [number=10]
 */
const createFakeEvents = async (number = 10) => {
    // check that the user has permissions
    const session = await auth();
    if (!session?.user?.email) throw Error("Creating fake events: user is not authenticated");

    // get the first 10 fake users
    // depends on how many competitions they want to make
    const existingUsersSnapshot = await fetchCollection("users").limit(number > 5 ? Math.floor(number / 2) : 4).get();
    if (existingUsersSnapshot.size === 0) throw Error("Creating fake events: No users in the database");
    const userData = existingUsersSnapshot.docs.map((userDoc) => ({ ...userDoc.data(), id: userDoc.id }));

    // fetch fake data for events, promise.all
    // getting fake data for competition from: https://jsonplaceholder.typicode.com/guide/


    // do a batched write of the fake competitions
};