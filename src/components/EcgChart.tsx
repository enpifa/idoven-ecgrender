import React, { useEffect, useRef } from 'react';
import zoomPlugin from 'chartjs-plugin-zoom';
import Chart from 'chart.js/auto';
import '../styles/EcgChart.css'
import { Button } from '@mui/material'

Chart.register(zoomPlugin);

let resetZoom: (mode: 'none') => void;

const EcgChart = ({ ecgData }: {ecgData: (number | null)[][]}) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    // const [reset, setReset] = React.useState<() => void>()

    useEffect(() => {
        let chartInstance: Chart | null = null;
        console.log("Creating chart...")
        if (ecgData.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance) {
                    // Destroy existing chart instance
                    (chartInstance as Chart).destroy();
                }
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                    labels: ecgData.map((row) => row[0]),
                    datasets: [
                        {
                            label: 'Row 1',
                            data: ecgData.map((row) => row[1]),
                            borderColor: 'blue',
                            // backgroundColor: 'blue',
                            borderWidth: 0.2,
                            fill: false,
                        },
                        {
                            label: 'Row 2',
                            data: ecgData.map((row) => row[2]),
                            borderColor: 'green',
                            backgroundColor: 'green',
                            borderWidth: 1,
                            fill: false,
                        },
                        {
                            label: 'Row 3',
                            data: ecgData.map((row) => row[3]),
                            borderColor: 'red',
                            backgroundColor: 'red',
                            borderWidth: 1,
                            fill: false,
                        },
                        {
                            label: 'Row 4',
                            data: ecgData.map((row) => row[4]),
                            borderColor: 'yellow',
                            backgroundColor: 'yellow',
                            borderWidth: 1,
                            fill: false,
                        },
                        // Repeat for other signal columns if necessary
                    ],
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Time',
                                },
                                min: 0,
                                max: 10,
                            },
                            y: {
                                title: {
                                display: true,
                                text: 'Signal',
                                },
                            },
                        },
                        plugins: {
                            zoom: {
                                pan: {
                                    enabled: true,
                                    mode: 'x',
                                    modifierKey: 'shift',
                                },
                                zoom: {
                                    mode: 'xy',
                                    drag: {
                                        enabled: true,
                                        borderColor: 'rgba(225,225,225,0.3)',
                                        borderWidth: 1,
                                        backgroundColor: 'rgb(225,225,225)',
                                    },
                                },
                            },
                        },
                    },
                });
                resetZoom = chartInstance.resetZoom
                // setReset(chartInstance.resetZoom)
            }
        }

        return () => {
            if (chartInstance) {
                (chartInstance as Chart).destroy();
            }
        };
    }, [ecgData]);

    return (
        <div>
            <canvas ref={chartRef}></canvas>
            <Button onClick={() => resetZoom ? resetZoom('none') : () => {}}>Reset zoom</Button>
        </div>
    )
};

export default EcgChart;
