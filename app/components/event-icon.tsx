'use client';

import { Event } from "@/types/event";
import { MapPinIcon, SparklesIcon, StarIcon, TrophyIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import { CardProps,  Icon, IconProps, } from "@tremor/react";

const CardColors: Record<Event["type"], CardProps["decorationColor"]> = {
    "mlp-teams": "orange",
    "doubles": "yellow",
    "singles": "cyan",
    "mix-n-match": "green",
    "training": "violet",
    "pickup": "slate",
};

// define the card icons
const CardIcons: Record<Event["type"], IconProps["icon"]> = {
    "mlp-teams": TrophyIcon,
    "doubles": UsersIcon,
    "singles": UserIcon,
    "mix-n-match": SparklesIcon,
    "training": StarIcon,
    "pickup": MapPinIcon,
};

/**
 * Component will return the event icon type
 *
 * @export
 * @param {({ type?: Event["type"] } & Partial<IconProps>)} { type = "pickup", ...params }
 * @return {*} 
 */
export default function EventIcon({ type = "pickup", ...params } : { type?: Event["type"] } & Partial<IconProps>) {
    return (
        <Icon variant="outlined" icon={CardIcons[type]} size="lg" color={CardColors[type]} />
    )
}