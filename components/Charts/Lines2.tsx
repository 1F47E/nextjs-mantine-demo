import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, Legend, ResponsiveContainer } from 'recharts';
import { Chip, Title, Divider } from '@mantine/core';

import { usePoolStore } from '../../store/pool';

// demo chart data
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   const data = Array.from({ length: 20 }, (_, i) => {
//     const date = new Date();
//     date.setHours(date.getHours() - i);  
//     return {
//       name: date.toLocaleString(),
//       value: getRandomInt(1000, 5000),  
//     };
//   }).reverse(); // reverse the array so it's sorted in ascending order by time




const CustomTooltip = (data: TooltipProps<any, any>) => {
    const { active, payload } = data;

    if (active && payload) {
        console.log('custom tooltip data:', data);
        return (
            <div className="recharts-custom-tooltip">
                {data &&
                    data.payload &&
                    data.payload.map((i: any) => {
                        return (
                            <Chip key={i}>{i.payload[i.dataKey]}</Chip>
                        )
                    })}
            </div>
        );
    }
    return null;
};

export default function Lines() {
    const { pool } = usePoolStore(); // Extract pool from the store
    console.log('bars pool storage data:', pool);
    const dataApi = pool?.size_history;
    console.log('Lines size_history:', dataApi);

    // remap data
    let feeSizeData: { name: string; value: number; }[] = [];
    if (dataApi && dataApi.length > 0) {
        feeSizeData = dataApi.map(size => ({
            name: size.toString(),
            value: size,
        }));
    }

    return (
        <ResponsiveContainer width="100%" height={300}>

            <LineChart
                data={feeSizeData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid color="string" strokeDasharray="0 0 " /> */}
                {/* <XAxis dataKey="name" /> */}
                <YAxis type="number" />
                {/* <Tooltip /> */}
                <Tooltip content={CustomTooltip} />
                {/* <Legend /> */}
                <Line
                    type="natural"
                    dataKey="value"
                    stroke="#ff9f43"
                    strokeWidth={3}
                //   activeDot={{ r: 1 }}
                />
                {/* <Line dataKey="pv" stroke="#ff9f43" strokeWidth={3} /> */}
            </LineChart>
        </ResponsiveContainer>
    );
}

// export default class Lines2 extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }
// }
