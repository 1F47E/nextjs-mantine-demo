import { useState, useEffect, PureComponent } from 'react';
// import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

import { useDisclosure } from '@mantine/hooks';
import { SegmentedControl, Loader, LoadingOverlay, Box, Title, Chip } from '@mantine/core';
// icons
import { IconInfoSquareRounded } from '@tabler/icons-react';

import { usePoolStore } from '../../store/pool';

// buckets := []uint{2, 3, 4, 5, 6, 8, 10, 15, 25, 35, 50, 70, 85, 100, 125, 150, 200, 250, 300, 350, 400, 450, 499}
const buckets = [
    2, 3, 4, 5, 6, 8, 10, 15, 25, 35, 50, 70, 85, 100,
    125, 150, 200, 250, 300, 350, 400, 450, 499, 500,
];

// TODO: move to component
const CustomTooltip = (data: TooltipProps<any, any>) => {
    const { active, payload } = data;

    if (active && payload) {
        // console.log('custom tooltip data:', data);
        return (
            <div className="recharts-custom-tooltip">
                {data &&
                    data.payload &&
                    data.payload.map((i: any) => (
                        <Chip key={i.dataKey}>
                            {i.payload.name}+ sat/byte - {i.payload.valueReal} txs
                            {/* {i.payload.name} */}
                        </Chip>
                    ))
                }
            </div>
        );
    }
    return null;
};

export default function Bars() {
    const [scale, setScale] = useState('log');
    const { pool } = usePoolStore();
    const data = pool?.fee_buckets;
    const [chartData, setChartData] = useState([]);


    useEffect(() => {
        if (data) {
            const transformedData = data.map((value, index) => {
                const valueReal = value;
                const name = buckets[index].toString();
                const transformedValue = scale === 'log' ? Math.log(value + 1) : value;
                return { name, value: transformedValue, valueReal };
            });
            setChartData(transformedData);
        }
    }, [data, scale]);

    return (
        <>
            <SegmentedControl
                value={scale}
                onChange={setScale}
                data={[
                    { label: 'Linear', value: 'linear' },
                    { label: 'Log', value: 'log' },
                ]}
            />
            
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} barGap={0} barSize={20}>
                    <XAxis dataKey="name" />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="value" stackId="a" fill="#826af9" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
