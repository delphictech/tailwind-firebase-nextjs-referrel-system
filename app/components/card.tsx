import { Event } from "@/types/event";
import { MapPinIcon, SparklesIcon, StarIcon, TrophyIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Bold, Card, CardProps, Divider, Flex, Icon, IconProps, Metric, Text, Title } from "@tremor/react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";

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

const CardIcons: Record<Event["type"], IconProps["icon"]> = {
    "mlp-teams": TrophyIcon,
    "doubles": UsersIcon,
    "singles": UserIcon,
    "mix-n-match": SparklesIcon,
    "training": StarIcon,
    "pickup": MapPinIcon,
};

/**
 * Main card for displaying data
 *
 * @export
 * @param {(MainCardParams & CardProps)} { color, title, icon, date,  ...params }
 * @return {*} 
 */
export default function MainCard({ type, name, date,  ...params }: Event & CardProps) {
    return (
        <Link href="/" target="_blank">
            <Card decoration="left" decorationColor={CardColors[type]} key={name} className="h-fit" {...params}>
            <Flex justifyContent="between">
                <Flex justifyContent="start" className="space-x-2">
                    <Icon variant="outlined" icon={CardIcons[type]} size="lg" color={CardColors[type]} />
                    <div>
                        <Text>
                            <Bold>{CardTypeText[type]}</Bold>
                        </Text>
                        <Text>{400} points available</Text>
                    </div>
                </Flex>
            </Flex>
            <Title className="truncate mt-3">
                {name}
            </Title>
            <Flex justifyContent="start" className="space-x-2 mt-2">
                <Image width={25} height={25} src={`https://api.dicebear.com/7.x/initials/png?seed=Felix&radius=50`} alt="avatar" />
                <Text>Hosted by John Doe</Text>
            </Flex>
            <Divider />
            <Flex alignItems="end" justifyContent="between">
                <div>
                    <Text>
                        <Bold>Boston, MA</Bold>
                    </Text>
                    <Text>June 5th at 4:00 pm</Text>
                </div>
                <Text>
                    <Bold>$25</Bold> / player
                </Text>
            </Flex>
            </Card>
        </Link>
    )
}