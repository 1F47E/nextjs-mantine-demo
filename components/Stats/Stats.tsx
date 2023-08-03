import { createStyles, Group, Paper, SimpleGrid, Text, rem } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
  IconBox,
  IconRipple,
} from '@tabler/icons-react';
import { usePoolStore } from '../../store/pool';

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const icons = {
  block: IconBox,
  pool: IconRipple,
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

interface StatsGridProps {
  data: { title: string; icon: keyof typeof icons; value: string; diff: number }[];
}

function StatsGrid() {
  const { pool } = usePoolStore(); // Extract pool from the store

  // Extract values from pool
  const blockValue = pool?.height?.toString() ?? '-';
  const feeValue = pool?.fee?.toString() ?? '-';
  const mempoolSizeValue = pool?.size?.toString() ?? '-';
  const mempoolWeightValue = pool?.weight?.toString() ?? '-';

  const { classes } = useStyles();
  const stats = [
    { title: 'Block', icon: 'block', value: blockValue, diff: 0 },
    { title: 'Current avg fee', icon: 'coin', value: feeValue, diff: 0 },
    { title: 'Mempool size', icon: 'pool', value: mempoolSizeValue, diff: 0 },
    { title: 'Mempool weight', icon: 'discount', value: mempoolWeightValue, diff: 0 },
  ];

  const statsItems = stats.map((stat) => {
    // const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          {/* <Icon className={classes.icon} size="1.4rem" stroke={1.5} /> */}
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          {stat.diff > 0 && (
            <Text color={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
              <span>{stat.diff}%</span>
              <DiffIcon size="1rem" stroke={1.5} />
            </Text>
          )}
        </Group>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {statsItems}
      </SimpleGrid>
    </div>
  );
}

export { StatsGrid };
export type { StatsGridProps };
