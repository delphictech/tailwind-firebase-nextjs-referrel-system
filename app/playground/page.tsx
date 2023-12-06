import { Card, Metric, Text, Title, BarList, Flex, Grid, Italic, BarListProps, Icon, Divider, Bold } from '@tremor/react';
import MainCard from '@/app/components/card';
import { fetchEvents } from '@/app/lib/events';
import { getUsers } from '@/app/lib/users';
import Image from 'next/image';
import { Event } from '@/types/event';
import { formatTimestampSeconds } from '@/app/utils/date';

const groupAndSortEventsByDay = <T extends Partial<Event & { timestampSeconds: number }>>(events: T[]) => {
  const grouped: { [day: string]: T[] } = {};

  // Group events by day
  events.forEach((event) => {
    const localDateString = formatTimestampSeconds(event.timestampSeconds, true);

    if (!grouped[localDateString]) {
      grouped[localDateString] = [];
    }

    grouped[localDateString].push(event);
  });

  // Convert grouped object to an array of objects with day and events
  const groupedArray = Object.keys(grouped).map((day) => ({
    day,
    events: grouped[day],
  }));

  // Sort the array by day in ascending order (oldest day first)
  groupedArray.sort((a, b) => {
    const dateA = new Date(a.day).getTime();
    const dateB = new Date(b.day).getTime();
    return dateA - dateB;
  });

  return groupedArray;
}

export default async function PlaygroundPage() {
  // fetch all events and group them by day
  const events = await fetchEvents();
  const groupedEvents = groupAndSortEventsByDay(events);

  // fetch all users by points
  const users = await getUsers("points", "desc", 5, true);
  const formattedUsers = users.map((user) => {
    const imageIcon = () => <Image className='mr-1' width={20} height={20} src={user.image || ""} alt='avatar' />;
    return { name: `${user.name}`, value: Math.floor(user.points || 0), icon: imageIcon };
  });

  // fetch all host users by host points
  const hosts = await getUsers("hostPoints", "desc", 5, true);
  const formattedHosts = hosts.map((user) => {
    const imageIcon = () => <Image className='mr-1' width={20} height={20} src={user.image || ""} alt='avatar' />;
    return { name: `${user.name}`, value: Math.floor(user.hostPoints || 0), icon: imageIcon };
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
      <Card key="points">
          <Title>Top Users</Title>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="space-x-2"
          >
            <Metric>100</Metric>
            <Text>Total users</Text>
          </Flex>
          <Flex className="mt-6">
            <Text>User</Text>
            <Text className="text-right">Points</Text>
          </Flex>
          <BarList
            data={formattedUsers}
            valueFormatter={(val: number) => val.toLocaleString()}
            className="mt-2"
          />
        </Card>
        <Card key="points">
          <Title>Top Hosts</Title>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="space-x-2"
          >
            <Metric>100</Metric>
            <Text>Total hosts</Text>
          </Flex>
          <Flex className="mt-6">
            <Text>Host</Text>
            <Text className="text-right">Points Awarded</Text>
          </Flex>
          <BarList
            data={formattedHosts}
            valueFormatter={(val: number) => val.toLocaleString()}
            className="mt-2"
          />
        </Card>

      </Grid>
      {/* <Chart /> */}
      <Card className="mt-8">
        <Title>Events</Title>
        <Text>Viewing events from <Bold>{groupedEvents.at(0)?.day}</Bold> to <Bold>{groupedEvents.at(groupedEvents.length - 1)?.day}</Bold></Text>
        <div className='space-y-8 mt-8'>
        {groupedEvents.length ? groupedEvents.map((group) => (
          <div key={group.day}>
            <Title>{group.day}</Title>
            <Divider className='my-4' />
            <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
              {group.events.map((item) => <MainCard key={item.id} {...item} />)}
            </Grid>
          </div>
        )) : <Text className='text-center my-8'><Italic>No Upcoming Events</Italic></Text>}
        </div>
      </Card>
    </main>
  );
}
