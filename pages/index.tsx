/* eslint-disable no-console */
import dynamic from 'next/dynamic';
import React, { useEffect, useState, useRef } from 'react';
import { Space, Box, Group, Flex, Button, Title, Divider, Grid, Stack } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { StatsGrid, StatsGridProps } from '../components/Stats/Stats';
import { TableTransactions } from '../components/Table/Table';
import { fetchData } from '../api/client';

// RECHARTS
const Lines2 = dynamic(() => import('../components/Charts/Lines2'), { ssr: false });
const Bars = dynamic(() => import('../components/Charts/Bars2'), { ssr: false });

// ws
const HOST_WS_URL = 'ws://localhost:8080/v0/ws';
const RECONNECT_TIME = 5000; // Time to wait before attempting to reconnect (in milliseconds)

// table data
const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export default function HomePage() {
  const socketRef = useRef<WebSocket | null>(null);

  const [stats, setStats] = useState<StatsGridProps>({
    data: [
      {
        title: 'Block',
        icon: 'block',
        value: '-',
        diff: 0,
      },
      {
        title: 'Current avg fee',
        icon: 'coin',
        value: '-',
        diff: 0,
      },
      {
        title: 'AVG tx fee',
        icon: 'discount',
        value: '-',
        diff: 0,
      },
      {
        title: 'Mempool size',
        icon: 'pool',
        value: '-',
        diff: 0,
      },
    ],
  });

  // ===== WEBSOCKETS
  const connect = () => {
    const websocket = new WebSocket(HOST_WS_URL);

    websocket.onopen = () => {
      console.log('connected');
      websocket.send('hello'); // send "hello" upon connection
    };

    websocket.onmessage = (event) => {
      console.log(event.data);
      // parse the incoming data
      const incomingData = JSON.parse(event.data);
      setStats({
        data: [
          {
            title: 'Block',
            icon: 'block',
            value: incomingData.pool_size.toString(),
            diff: 0, // set this based on your logic
          },
          {
            title: 'Current avg fee',
            icon: 'coin',
            value: incomingData.avg_fee.toString(),
            diff: 0, // set this based on your logic
          },
          {
            title: 'AVG tx fee',
            icon: 'discount',
            value: incomingData.total_fee.toString(),
            diff: 0, // set this based on your logic
          },
          {
            title: 'Mempool size',
            icon: 'pool',
            value: incomingData.total_amount.toString(),
            diff: 0, // set this based on your logic
          },
        ],
      });
    };
    websocket.onerror = (error) => console.log('WebSocket error: ', error);

    websocket.onclose = (event) => {
      console.log('WebSocket connection closed: ', event);
      console.log('Reconnecting...');
      setTimeout(connect, RECONNECT_TIME);
    };

    // Store the websocket instance in useRef
    socketRef.current = websocket;
  };

  useEffect(() => {
    // Connection
    connect();

    // Cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // ===== API request on start
  useEffect(() => {
    const getData = async () => {
      try {
        console.log('requesting pool');
        const apidata = await fetchData('pool').then((d) => {
          const pool = d.data;
          console.log('api data', pool);
          // if (pool.height) {
          //   // setHeight(d.height);
          //   console.log('height', pool.height);
          // }
          const avgFee = Math.floor(pool.fee / pool.weight);
          const updatedStats = {
            data: [
              {
                title: 'Block',
                icon: 'block',
                value: pool.height.toString(),
                diff: 0, // provide diff value
              },
              {
                title: 'Current avg fee',
                icon: 'coin',
                value: avgFee.toString(),
                diff: -13, // provide diff value
              },
              {
                title: 'Mempool size',
                icon: 'pool',
                value: pool.size.toString(),
                diff: -30, // provide diff value
              },
              {
                title: 'Mempool weight',
                icon: 'discount',
                value: pool.weight.toString(),
                diff: 18, // provide diff value
              },
            ],
          } as StatsGridProps;
          setStats(updatedStats);

          return pool;
        });

        // debug incoming data
        console.log(apidata);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Welcome />

      <StatsGrid data={stats.data} />

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
