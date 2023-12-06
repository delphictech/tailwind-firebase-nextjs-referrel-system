import { Timestamp } from "firebase-admin/firestore";
import { LinkProps } from "next/link";

export interface Location {
    name: string;
    longitude: number;
    latitude: number;
};

export interface Event {
    link: LinkProps["href"];
    name?: string;
    description?: string;
    timestamp?: Timestamp;
    price?: number;
    points?: number;
    hostID: string;
    location?: Location;
    type: "mlp-teams" | "singles" | "doubles" | "mix-n-match" | "training" | "pickup";
};