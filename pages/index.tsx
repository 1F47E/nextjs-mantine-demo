import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { StatsGrid, StatsGridProps } from '../components/Stats/Stats';

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

export default function HomePage() {
  return (
    <>
      <Welcome />
      <StatsGrid data={data.data} />
      <ColorSchemeToggle />
    </>
  );
}
