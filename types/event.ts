import { LinkProps } from "next/link";

export interface Location {
    name: string;
    longitude: number;
    latitude: number;
};

export interface Event {
    registrationLink: LinkProps["href"];
    name?: string;
    description?: string;
    date?: Date;
    price?: number;
    points?: number;
    hostID: string;
    location?: Location;
    type: "mlp-teams" | "singles" | "doubles" | "mix-n-match" | "training" | "pickup";
};