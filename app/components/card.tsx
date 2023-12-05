import { CurrencyDollarIcon, MapPinIcon, SparklesIcon, StarIcon, TrophyIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Bold, Card, CardProps, Divider, Flex, Icon, IconProps, Metric, Text, Title } from "@tremor/react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
 
export interface MainCardParams {
    href: LinkProps["href"];
    name?: string;
    date?: string;
    type: "mlp-teams" | "singles" | "doubles" | "mix-n-match" | "training" | "pickup"
};

const CardColors: Record<MainCardParams["type"], CardProps["decorationColor"]> = {
    "mlp-teams": "orange",
    "doubles": "yellow",
    "singles": "cyan",
    "mix-n-match": "green",
    "training": "violet",
    "pickup": "slate",
};

const CardTypeText: Record<MainCardParams["type"], string> = {
    "mlp-teams": "Team Format",
    "doubles": "Doubles",
    "singles": "Singles",
    "mix-n-match": "Mix n' Match Doubles",
    "training": "Training",
    "pickup": "Informal Pickup",
};

const CardIcons: Record<MainCardParams["type"], IconProps["icon"]> = {
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
export default function MainCard({ type, href, name, date,  ...params }: MainCardParams & CardProps) {
    return (
        <Link href={href}>
            <Card decoration="left" decorationColor={CardColors[type]} key={name} className="h-fit" {...params}>
            <Flex justifyContent="between">
                <Flex justifyContent="start" className="space-x-2">
                    <Icon variant="outlined" icon={CardIcons[type]} size="lg" color={CardColors[type]} />
                    <div>
                        <Bold>{CardTypeText[type]}</Bold>
                        <Text>{400} points available</Text>
                    </div>
                </Flex>
            </Flex>
            <Metric className="truncate mt-3">{name}</Metric>
            <Flex className="space-x-2 mt-3">
                <Image width={25} height={25} src={`https://api.dicebear.com/7.x/initials/png?seed=Felix&radius=50`} alt="avatar" />
            </Flex>
            <Divider />
            <Text>
                Last Inspection: <Bold>{date}</Bold>
            </Text>
            </Card>
        </Link>
    )
}