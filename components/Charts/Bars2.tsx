import React, { PureComponent } from 'react';
// import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

import { Box, Title } from '@mantine/core';
import { Chip } from '@mantine/core';

// icons
import { IconInfoSquareRounded } from '@tabler/icons-react';

import { usePoolStore } from '../../store/pool';

// buckets := []uint{2, 3, 4, 5, 6, 8, 10, 15, 25, 35, 50, 70, 85, 100, 125, 150, 200, 250, 300, 350, 400, 450, 499}
let buckets = [
    2, 3, 4, 5, 6, 8, 10, 15, 25, 35, 50, 70, 85, 100, 
    125, 150, 200, 250, 300, 350, 400, 450, 499, 500,
];
let feeData = buckets.map(bucket => ({
    name: bucket.toString(), // convert bucket value to string for the 'name' property
    value: 0,
}));

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
 
    // remap data
    if (data) {
        if (feeData.length === data.length) {
            for (let i = 0; i < data.length; i++) {
                feeData[i].value = data[i];
                // console.log("data", data[i]);
            }
        } else {
            console.error('Lengths of feeData and apiData are not the same');
        }
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                // width={420}
                // height={250}
                data={feeData}
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
