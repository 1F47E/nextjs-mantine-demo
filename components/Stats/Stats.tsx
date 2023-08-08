import dynamic from 'next/dynamic';
import { createStyles, Group, Paper, SimpleGrid, Text, Title, rem } from '@mantine/core';
import AnimatedNumber from "animated-number-react";

import {
  IconDiscount2,
  IconCoin,
  IconBox,
  IconRipple,
  IconSalt,
} from '@tabler/icons-react';
import { usePoolStore } from '../../store/pool';

const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
  ssr: false,
});

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
  discount: IconDiscount2,
  coin: IconCoin,
  size: IconSalt,
};

interface StatsGridProps {
  title: string;
  icon: string;
  value: number;
}

function StatsGrid() {
  const { pool } = usePoolStore(); // Extract pool from the store


  // Extract values from pool
  const blockValue = pool?.height ?? 0;

  // fee
  let feeTitle = 'Current fee';
  let feeValue = pool?.fee ?? 0;
  const btc = 100000000;

  // if fee is greater than 0.1 btc, convert to btc
  if (feeValue > btc / 10) {
    feeValue = Math.round((feeValue / btc) * 100) / 100;
    feeTitle += ' (BTC)';
  } else {
    feeTitle += ' (sat)';
  }

  const mempoolSizeValue = pool?.size ?? 0;

  // weight
  let weightTitle = 'Mempool weight';
  let mempoolWeightValue = pool?.weight ?? 0;

  if (mempoolWeightValue > 0) {
    if (mempoolWeightValue > 1024) {
      mempoolWeightValue = Math.round((mempoolWeightValue / 1024) * 100) / 100;
      weightTitle += ' (MB)';
    } else {
      weightTitle += ' (KB)';
    }
  }

  const { classes } = useStyles();
  const stats: StatsGridProps[] = [
    { title: 'Block #', icon: 'block', value: blockValue },
    { title: feeTitle, icon: 'discount', value: feeValue },
    { title: 'Mempool size', icon: 'pool', value: mempoolSizeValue },
    { title: weightTitle, icon: 'size', value: mempoolWeightValue },
  ];

  const statsItems = stats.map((stat) => {
    const iconName = stat.icon as keyof typeof icons;
    const Icon = icons[iconName];
    // const formatValue = (value:number) => value.toFixed(0);
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>

        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />

        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>
            <Title>{stat.value}</Title>
          </Text>
          {/* <AnimatedNumber
            value={stat.value}
            formatValue={formatValue}
          /></Text> */}
          {/* <AnimatedNumbers
            includeComma
            animateToNumber={stat.value}
            fontStyle={{ fontSize: 30 }}
            locale="en-US"
            configs={(number, index) => (
              { mass: 1, tension: 230 * (index + 1), friction: 140 })
            }
          /> */}
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
