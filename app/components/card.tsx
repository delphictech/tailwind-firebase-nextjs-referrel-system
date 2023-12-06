import EventIcon from "@/app/components/event-icon";
import { getUserByID } from "@/app/lib/users";
import { formatTimestampSeconds } from "@/app/utils/date";
import { Event } from "@/types/event";
import { Bold, Card, CardProps, Divider, Flex, Metric, Text } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const CardColors: Record<Event["type"], CardProps["decorationColor"]> = {
    "mlp-teams": "orange",
    "doubles": "yellow",
    "singles": "cyan",
    "mix-n-match": "green",
    "training": "violet",
    "pickup": "slate",
};

const CardTypeText: Record<Event["type"], string> = {
    "mlp-teams": "Team Format",
    "doubles": "Doubles",
    "singles": "Singles",
    "mix-n-match": "Mix n' Match",
    "training": "Training",
    "pickup": "Informal Pickup",
};

/**
 * Main card for displaying data
 *
 * @export
 * @param {(MainCardParams & CardProps)} { color, title, icon, date,  ...params }
 * @return {*} 
 */
export default async function MainCard({ type = "pickup", ...item }: { id: string } & Partial<Omit<Event, "timestamp">> & { timestampSeconds?: number }) {
    // get host object
    const hostUser = await getUserByID(item.hostID || "");

    // get date string
    const formattedDateString = formatTimestampSeconds(item.timestampSeconds);
    return (
        <Link href="/" target="_blank">
            <Card decoration="left" decorationColor={CardColors[type]} key={item.id} className="h-fit">
            <Metric className="truncate mb-4">
                {item.name}
            </Metric>
            <Flex justifyContent="between">
                <Flex justifyContent="start" className="space-x-2">
                    <EventIcon type={type} />
                    <div>
                        <Text>
                            <Bold>{CardTypeText[type]}</Bold>
                        </Text>
                        <Text>{Math.floor(item.points || 0)} points available</Text>
                    </div>
                </Flex>
            </Flex>
            <Divider />
            <Flex alignItems="end" justifyContent="between">
                <div>
                    <Text>
                        <Bold>{item.location?.name}</Bold>
                    </Text>
                    <Text>{formattedDateString}</Text>
                    <Suspense>
                        <Flex justifyContent="start" className="space-x-2 mt-0.5">
                            <Image width={25} height={25} src={`https://api.dicebear.com/7.x/initials/png?seed=${hostUser.firstName}&radius=50`} alt="avatar" />
                            <Text>Hosted by {hostUser.firstName} {hostUser.lastName}</Text>
                        </Flex>
                    </Suspense>
                </div>
                <Text>
                    <Bold>${Math.floor(item.price || 0) / 100}</Bold> / player
                </Text>
            </Flex>
            </Card>
        </Link>
    )
}