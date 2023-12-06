import { Event } from "@/types/event";
import { Invoice } from "@/types/invoices";
import { InvitedUser, User } from "@/types/user";
import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

// View the firebase admin documentation
// https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore.md#firebase-adminfirestore_module

// will initialize firestore safely
// must init a firebase account and a firestore database
// https://authjs.dev/reference/adapter/firebase#initfirestore
export const firestore = initFirestore({
 credential: cert({
   projectId: process.env.FIREBASE_PROJECT_ID,
   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
   privateKey: process.env.FIREBASE_PRIVATE_KEY,
 })
});

/**
 * Define the types returned from the specific collections in firebase
 *
 * @export
 * @interface CollectionTypes
 */
export interface CollectionTypes {
  "users": User,
  "events": Event,
};

/**
 * Subcollection and their associated types
 *
 * @export
 * @interface SubcollectionTypes
 */
export interface SubcollectionTypes {
	"invited-users": InvitedUser,
};

// define the parent collections of the subcollections
const ParentCollection: Record<keyof SubcollectionTypes, keyof CollectionTypes> = {
	"invited-users": "users",
};

/**
 * Generic data type converter from firestore
 *
 * @template T
 */
const genericConverter = <T>() => ({
	toFirestore: (inputData: T) => inputData,
	fromFirestore: (snapshot: QueryDocumentSnapshot): T => snapshot.data() as T,
});


export /**
 * Create a collection function, using typecasting and the withConverter function to get typed data back from firestore
 * With fetching, assume return types are all partials
 * 
 * @template T
 * @param {string} collectionName
 * @return {*}  {CollectionReference<T>}
 */
const fetchCollection = <T extends keyof CollectionTypes>(
	collectionName: T
) => {
	const converter = genericConverter<Partial<CollectionTypes[T]>>() as FirestoreDataConverter<Partial<CollectionTypes[T]>>;
	return firestore.collection(collectionName).withConverter<Partial<CollectionTypes[T]>>(converter);
};

export /**
 * Create a collection function, using typecasting and the withConverter function to get typed data back from firestore
 * With mutation, make the necessary fields required
 * 
 * @template T
 * @param {string} collectionName
 * @return {*}  {CollectionReference<T>}
 */
const mutateCollection = <T extends keyof CollectionTypes>(
	collectionName: T
) => {
	const converter = genericConverter<CollectionTypes[T]>() as FirestoreDataConverter<CollectionTypes[T]>;
	return firestore.collection(collectionName).withConverter<CollectionTypes[T]>(converter);
};

export /**
 * Create a subcollection function, using typecasting and the withConverter function to get typed data back from firestore
 * With fetching, assume return types are all partials
 * 
 * @template T
 * @param {string} collectionName
 * @return {*}  {CollectionReference<T>}
 */
const fetchSubcollection = <T extends keyof SubcollectionTypes>(
	subcollectionName: T,
	docID: string,
) => {
	const converter = genericConverter<Partial<SubcollectionTypes[T]>>() as FirestoreDataConverter<Partial<SubcollectionTypes[T]>>;
	return firestore.collection(ParentCollection[subcollectionName]).doc(docID).collection(subcollectionName).withConverter<Partial<SubcollectionTypes[T]>>(converter);
};

export /**
 * Create a subcollection function, using typecasting and the withConverter function to get typed data back from firestore
 * With mutation, make the necessary fields required
 * 
 * @template T
 * @param {string} collectionName
 * @return {*}  {CollectionReference<T>}
 */
const mutateSubcollection = <T extends keyof SubcollectionTypes>(
	subcollectionName: T,
	docID: string,
) => {
	const converter = genericConverter<SubcollectionTypes[T]>() as FirestoreDataConverter<SubcollectionTypes[T]>;
	return firestore.collection(ParentCollection[subcollectionName]).doc(docID).collection(subcollectionName).withConverter<SubcollectionTypes[T]>(converter);
};