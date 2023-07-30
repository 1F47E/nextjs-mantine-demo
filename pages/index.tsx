import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { StatsGrid, StatsGridProps } from '../components/Stats/Stats';
import { TableTransactions } from '../components/Table/Table';

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
      <TableTransactions data={elements} />
      <ColorSchemeToggle />
    </>
  );
}
