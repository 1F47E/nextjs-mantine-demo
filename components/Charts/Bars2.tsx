import React, { PureComponent } from 'react';
// import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

import { Box, Title } from '@mantine/core';
import { Chip } from '@mantine/core';

// icons
import { IconInfoSquareRounded } from '@tabler/icons-react';

const data2 = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
    },
];


const data = [
    {
        name: '7/12',
        Apple: 80,
        Samsung: 130,
        Oneplus: 150,
        Motorola: 210,
    },
    {
        name: '8/12',
        Apple: 100,
        Samsung: 150,
        Oneplus: 170,
        Motorola: 380,
    },
    {
        name: '9/12',
        Apple: 80,
        Samsung: 140,
        Oneplus: 160,
        Motorola: 220,
    },
    {
        name: '10/12',
        Apple: 100,
        Samsung: 150,
        Oneplus: 170,
        Motorola: 380,
    },
    {
        name: '11/12',
        Apple: 50,
        Samsung: 90,
        Oneplus: 110,
        Motorola: 150,
    },
    {
        name: '12/12',
        Apple: 125,
        Samsung: 90,
        Oneplus: 100,
        Motorola: 65,
    },
    {
        name: '13/12',
        Apple: 70,
        Samsung: 110,
        Oneplus: 130,
        Motorola: 210,
    },
    {
        name: '14/12',
        Apple: 100,
        Samsung: 150,
        Oneplus: 170,
        Motorola: 380,
    },
    {
        name: '15/12',
        Apple: 80,
        Samsung: 100,
        Oneplus: 120,
        Motorola: 180,
    },
    {
        name: '16/12',
        Apple: 30,
        Samsung: 60,
        Oneplus: 70,
        Motorola: 110,
    },
];


// TODO: move to component
const CustomTooltip = (data: TooltipProps<any, any>) => {
    const { active, payload } = data

    if (active && payload) {
        return (
            <div className='recharts-custom-tooltip'>
                {data &&
                    data.payload &&
                    data.payload.map((i: any) => {
                        return (
                            // <Chip >{`${i.dataKey} : ${i.payload[i.dataKey]}`}</Chip>
                            <Chip >{i.payload[i.dataKey]}</Chip>
                        )
                    })}
            </div>
        )
    };

    return null
};


export default function Bars() {
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
            <XAxis />
            {/* <Tooltip /> */}
            <Tooltip content={CustomTooltip} />
            {/* <Legend /> */}
            {/* <Bar dataKey="Apple" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" /> */}
            <Bar dataKey="Apple" stackId="a" fill="#826af9" />
        </BarChart>
        </ResponsiveContainer>
    );
}
