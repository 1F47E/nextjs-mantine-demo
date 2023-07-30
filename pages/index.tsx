import dynamic from 'next/dynamic';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { StatsGrid, StatsGridProps } from '../components/Stats/Stats';
import { TableTransactions } from '../components/Table/Table';

// mantine
import { Space, Box, Group, Flex, Button, Title, Divider, Grid, Stack } from '@mantine/core';


// import { Bars } from '../components/Charts/Bars2';
// APEX
// const Lines = dynamic(() => import('../components/Charts/Lines'), { ssr: false });
// const Bars = dynamic(() => import('../components/Charts/Bars'), { ssr: false });
// RECHARTS
const Lines2 = dynamic(() => import('../components/Charts/Lines2'), { ssr: false });
const Bars = dynamic(() => import('../components/Charts/Bars2'), { ssr: false });

const data: StatsGridProps = {
  data: [
    {
      title: 'Block',
      icon: 'block',
      value: '13,456',
      diff: 34,
    },
    {
      title: 'Current fee',
      icon: 'coin',
      value: '4,145',
      diff: -13,
    },
    {
      title: 'AVG tx fee',
      icon: 'discount',
      value: '745',
      diff: 18,
    },
    {
      title: 'Mempool size',
      icon: 'pool',
      value: '188',
      diff: -30,
    },
  ],
};

// table data
const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export default function HomePage() {
  return (
    <>
      <Welcome />

      <StatsGrid data={data.data} />

      <Space h="xl" />
      <Group position="center" grow>
        <Stack>
          <Title order={3} weight={400} align="center">Mempool size</Title>
          <Lines2 />
        </Stack>
        <Stack>
          <Title order={3} weight={400} align="center">Mempool fee</Title>
          <Bars />
        </Stack>
      </Group>

      <Space h="xl" />

      <Title order={3} weight={400} align="center">Mempool transactions</Title>
      <Box
        // component="a"
        // href="https://mantine.dev"
        // target="_blank"
        sx={(theme) => ({
          display: 'block',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          // color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[7],
          textAlign: 'center',
          padding: theme.spacing.xl,
          margin: theme.spacing.xl,
          borderRadius: theme.radius.md,


        })}
      >
        <TableTransactions data={elements} />

      </Box>


      <Space h="xl" />
      <ColorSchemeToggle />
    </>
  );
}
