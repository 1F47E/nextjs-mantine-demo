import React, { PureComponent } from 'react';
// import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

import { Box, Title } from '@mantine/core';
import { Chip } from '@mantine/core';

// icons
import { IconInfoSquareRounded } from '@tabler/icons-react';

import { usePoolStore } from '../../store/pool';

const dataDemo = [
    {
        name: '7/12',
        value: 80,
    },
    {
        name: '8/12',
        value: 100,
    },
    {
        name: '9/12',
        value: 80,
    },
    {
        name: '10/12',
        value: 100,

    },
    {
        name: '11/12',
        value: 50,

    },
    {
        name: '12/12',
        value: 55,

    },
    {
        name: '13/12',
        value: 70,
    },
    {
        name: '14/12',
        value: 100,

    },
    {
        name: '15/12',
        value: 80,

    },
    {
        name: '16/12',
        value: 30,

    },
];


// TODO: move to component
const CustomTooltip = (data: TooltipProps<any, any>) => {
    const { active, payload } = data;

    if (active && payload) {
        console.log('custom tooltip data:', data);
        return (
            <div className='recharts-custom-tooltip'>
                {data &&
                    data.payload &&
                    data.payload.map((i: any) => {
                        return (
                            <Chip key={i.dataKey}>{i.value}</Chip>
                        )
                    })}
            </div>
        );
    };

    return null;
};

export default function Bars() {
    const { pool } = usePoolStore(); // Extract pool from the store
    console.log('bars pool storage data:', pool);
    let data = pool?.fee_buckets;
 

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                // width={420}
                // height={250}
                data={data}
                barGap={0}
                barSize={20}
            //   layout="vertical"
            >
                {/* <YAxis /> */}
                <XAxis dataKey="name" />
                {/* <Tooltip /> */}
                <Tooltip content={CustomTooltip} />
                {/* <Legend /> */}
                {/* <Bar dataKey="Apple" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" /> */}
                <Bar dataKey="value" stackId="a" fill="#826af9" />
            </BarChart>
        </ResponsiveContainer>
    );
}
