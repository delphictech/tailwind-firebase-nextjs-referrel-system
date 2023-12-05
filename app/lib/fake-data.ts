import { auth } from "@/app/auth/config";
import { fetchCollection } from "@/app/lib/firebase";


export const createFakeEvents = async (number = 10) => {
    // check that the user has permissions
    const session = await auth();
    if (!session?.user?.email) throw Error("Creating fake events: user is not authenticated");

    // get the first 10 fake users
    // depends on how many competitions they want to make
    const existingUsersSnapshot = await fetchCollection("users").limit(number > 5 ? Math.floor(number / 2) : 4).get();
    if (existingUsersSnapshot.size === 0) throw Error("Creating fake events: No users in the database");
    const userData = existingUsersSnapshot.docs.map((userDoc) => ({ ...userDoc.data(), id: userDoc.id }));

    // fetch fake data for events, promise.all

    // do a batched write of the fake competitions
};