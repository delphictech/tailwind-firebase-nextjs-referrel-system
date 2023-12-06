// For more information on the schema defined here, view the following link
// https://authjs.dev/getting-started/adapters#models

import { Location } from "@/types/event";
import { Timestamp } from "firebase-admin/firestore";
import { User as AuthUser } from "next-auth";

// base user object
export interface User {
    email: string;
    emailVerified?: Timestamp;
    firstName: string;
    lastName: string;
    name: string;
    image: string;
    points?: number;
    hostPoints?: number;
    lastLocation?: Location;
};

// users that are invited to the platform
export interface InvitedUser {
    email: string;
    status: "pending" | "accepted" | "expired";
}