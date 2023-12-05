import { LinkProps } from "next/link";

export interface Event {
    href: LinkProps["href"];
    name?: string;
    date?: string;
    type: "mlp-teams" | "singles" | "doubles" | "mix-n-match" | "training" | "pickup";
};