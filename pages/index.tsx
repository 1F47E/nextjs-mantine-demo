/* eslint-disable no-console */
import dynamic from 'next/dynamic';
import React, { useEffect, useState, useRef } from 'react';
import { Space, Box, Group, Flex, Button, Title, Divider, Grid, Stack } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
// import { StatsGrid, StatsGridProps } from '../components/Stats/Stats';
import { TableTransactions } from '../components/Table/Table';
import { fetchData } from '../api/client';
import { usePoolStore } from '../store/pool';

const StatsGridNoSSR = dynamic(
  () => import('../components/Stats/Stats').then((module) => module.StatsGrid),
  { ssr: false }
);

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
  const { updatePool } = usePoolStore();

  // ===== WEBSOCKETS
  const WSconnect = () => {
    const websocket = new WebSocket(HOST_WS_URL);

    websocket.onopen = () => {
      console.log('connected');
      websocket.send('hello'); // send "hello" upon connection
    };

    websocket.onmessage = (event) => {
      console.log(event.data);
      // parse the incoming data
      const incomingData = JSON.parse(event.data);
      updatePool(incomingData);
    };
    websocket.onerror = (error) => console.log('WebSocket error: ', error);

    websocket.onclose = (event) => {
      console.log('WebSocket connection closed: ', event);
      console.log('Reconnecting...');
      setTimeout(WSconnect, RECONNECT_TIME);
    };

    // Store the websocket instance in useRef
    socketRef.current = websocket;
  };

  useEffect(() => {
    // wsConnection
    WSconnect();

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
          updatePool(pool);
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

      <StatsGridNoSSR />

      <Space h="xl" />

      <Group position="center" grow>
        <Stack>
          <Title order={3} weight={400} align="center">Mempool size</Title>
          <Lines2 />
        </Stack>
        <Stack>
          <Title order={3} weight={400} align="center">Mempool fee distribution sat/byte</Title>
          <Bars />
        </Stack>
      </Group>

      <Space h="xl" />

      <Title order={3} weight={400} align="center">Mempool transactions</Title>
      <Box
        sx={(theme) => ({
          display: 'block',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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
