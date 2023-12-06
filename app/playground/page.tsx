import { Card, Metric, Text, Title, BarList, Flex, Grid, Italic } from '@tremor/react';
import MainCard from '@/app/components/card';
import { fetchEvents } from '@/app/lib/events';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  // {
  //   category: 'Mobile App',
  //   stat: '2,543',
  //   data: app
  // }
];

export default async function PlaygroundPage() {
  // fetch all events
  const events = await fetchEvents();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total users</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Users</Text>
              <Text className="text-right">Points</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
      {/* <Chart /> */}
      <Card className="mt-8">
        <Title>Events</Title>
        <Text>Explore the following events</Text>
        <Grid numItemsSm={1} numItemsLg={events.length ? 2 : 1} className="gap-6 mt-4">
          {events.length ? events.map((item) => <MainCard key={item.id} {...item} />) : <Text className='text-center my-8'><Italic>No Upcoming Events</Italic></Text>}
        </Grid>
      </Card>
    </main>
  );
}
