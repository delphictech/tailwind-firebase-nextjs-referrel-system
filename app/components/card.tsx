import { Accordion, AccordionBody, AccordionHeader, BarList, Bold, ButtonProps, Card, CardProps, Divider, Flex, Icon, IconProps, ProgressBar, Text, Title } from "@tremor/react";
import Link, { LinkProps } from "next/link";
 
export interface MainCardParams {
    href: LinkProps["href"];
    color?: CardProps["decorationColor"], 
    title?: string;
    icon: IconProps["icon"];
    date?: string;
};

/**
 * Main card for displaying data
 *
 * @export
 * @param {(MainCardParams & CardProps)} { color, title, icon, date,  ...params }
 * @return {*} 
 */
export default function MainCard({ color, href, title, icon, date,  ...params }: MainCardParams & CardProps) {
 
    return (
        <Link href={href}>
            <Card decoration="left" decorationColor={color} key={title} className="h-fit" {...params}>
            <Flex justifyContent="start" className="space-x-4">
                <Icon variant="outlined" icon={icon} size="sm" color={color} />
                <Title className="truncate">{title}</Title>
            </Flex>
            <Flex className="space-x-3 mt-3">
                {/* <ProgressBar className="mt-0" value={item.value} color={item.color} /> */}
                {/* <Title>{item.value}%</Title> */}
            </Flex>
            <Divider />
            <Text>
                Last Inspection: <Bold>{date}</Bold>
            </Text>
            </Card>
        </Link>
    )
}