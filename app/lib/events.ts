import { fetchCollection } from "@/app/lib/firebase";
import { Event } from "@/types/event";

export /**
 * Function will fetch all of the available events
 *
 * @param {boolean} [serialize=true]
 */
const fetchEvents = async (serialize = true) => {
    // fetch the events
    const allEventsSnapshot = await fetchCollection("events").where("date", ">=", new Date()).get();
    
    const events = allEventsSnapshot.docs.map((doc) => {
        const dateString = doc.data()?.timestamp?.valueOf();
        if (serialize) {
            const docData = { ...doc.data(), timestamp: dateString, id: doc.id };
            return docData;
        } return { ...doc.data(), id: doc.id };
    });

    return events;
}