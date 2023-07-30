import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// var trigoStrength = 3
// var iteration = 11

// function getRandom() {
//   var i = iteration;
//   return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
// }

// function getRangeRandom(yrange) {
//   return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
// }

// function generateMinuteWiseTimeSeries(baseval:number, count:number, yrange:any) {
//   let i = 0;
//   const series = [];
//   while (i < count) {
//     let x = baseval;
//     let y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))

//     series.push([x, y]);
//     baseval += 300000;
//     i++;
//   }
//   return series;
// }

const options2: ApexOptions = {
    chart: {
        height: 350,
        type: 'line',
        stacked: true,
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000,
            },
        },
        dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 5,
            left: -7,
            top: 22,
        },
        //   events: {
        //     animationEnd: function (chartCtx, opts) {
        //       const newData1 = chartCtx.w.config.series[0].data.slice()
        //       newData1.shift()
        //       const newData2 = chartCtx.w.config.series[1].data.slice()
        //       newData2.shift()

        //       // check animation end event for just 1 series to avoid multiple updates
        //       if (opts.el.node.getAttribute('index') === '0') {
        //         window.setTimeout(function () {
        //           chartCtx.updateOptions({
        //             series: [{
        //               data: newData1
        //             }, {
        //               data: newData2
        //             }],
        //             subtitle: {
        //               text: parseInt(getRandom() * Math.random()).toString(),
        //             }
        //           }, false, false)
        //         }, 300)
        //       }

        //     }
        //   },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'straight',
        width: 5,
    },
    grid: {
        padding: {
            left: 0,
            right: 0,
        },
    },
    markers: {
        size: 0,
        hover: {
            size: 0,
        },
    },
    // series: [{
    //   name: 'Running',
    //   data: generateMinuteWiseTimeSeries(new Date('12/12/2016 00:20:00').getTime(), 12, {
    //     min: 30,
    //     max: 110,
    //   }),
    // }, {
    //   name: 'Waiting',
    //   data: generateMinuteWiseTimeSeries(new Date('12/12/2016 00:20:00').getTime(), 12, {
    //     min: 30,
    //     max: 110,
    //   }),
    // }],
    xaxis: {
        type: 'datetime',
        range: 2700000,
    },
    title: {
        text: 'Processes',
        align: 'left',
        style: {
            fontSize: '12px',
        },
    },
    subtitle: {
        text: '20',
        floating: true,
        align: 'right',
        offsetY: 0,
        style: {
            fontSize: '22px',
        },
    },
    legend: {
        show: true,
        floating: true,
        horizontalAlign: 'left',
        onItemClick: {
            toggleDataSeries: false,
        },
        position: 'top',
        offsetY: -28,
        offsetX: 60,
    },
};

const options: ApexOptions = {
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    }],
    chart: {
        type: 'line',
        height: 350,
        stacked: true,
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000,
            },
        },
        dropShadow: {
            enabled: false,
        },
    },
    plotOptions: {
        bar: {
            borderRadius: 1,
            horizontal: true,
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: [
            '0-2',
            '3-4',
            'United Kingdom',
            'Netherlands',
            'Italy',
            'France',
            'Japan',
            'United States',
            'China',
            'Germany',
        ],
    },
    title: {
        text: 'Processes',
        align: 'left',
        style: {
            fontSize: '12px',
        },
    },
    subtitle: {
        text: '20',
        floating: true,
        align: 'right',
        offsetY: 0,
        style: {
            fontSize: '22px',
        },
    },
    legend: {
        show: true,
        floating: true,
        horizontalAlign: 'left',
        onItemClick: {
            toggleDataSeries: false,
        },
        position: 'top',
        offsetY: -28,
        offsetX: 60,
    },
    stroke: {
        curve: 'straight',
        width: 5,
    },
    grid: {
        padding: {
            left: 0,
            right: 0,
        },
    },
    markers: {
        size: 0,
        hover: {
            size: 0,
        },
    },
};

export function Lines() {
    return (
        <div>
            <ReactApexChart
              options={options}
              series={options.series}
              type="bar"
              height={350}
            />
        </div>
    );
}

export default Lines;
