import React, { useEffect, useRef } from 'react';
import zoomPlugin from 'chartjs-plugin-zoom';
import Chart from 'chart.js/auto';
import '../styles/styles.css'
import { Button, Typography } from '@mui/material'
import { options } from '../constants'
import { getDatasets } from '../utils'

Chart.register(zoomPlugin);

let resetZoom: (mode: 'none') => void;

const EcgChart = ({ ecgData }: {ecgData: (number | null)[][]}) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    let chartInstance: Chart | null = null;

    useEffect(() => {
        console.log("Creating chart...")
        if (ecgData.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance) {
                    // Destroy existing chart instance
                    (chartInstance as Chart).destroy();
                }
                console.log("Loading chart...")
                setIsLoading(true)
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ecgData.map((row) => row[0]),
                        datasets: getDatasets(ecgData),
                    },
                    options,
                });
                console.log("Chart loaded!")
                setIsLoading(false)
                resetZoom = chartInstance.resetZoom
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
            {isLoading ? <Typography>Loading chart, this might take a few seconds...</Typography> : null}
            <div className={isLoading ? 'canvasLoading' : 'canvasLoaded'}>
                <canvas ref={chartRef}></canvas>
            </div>
            {!isLoading ? <Button variant="contained" color="secondary" onClick={() => resetZoom ? resetZoom('none') : () => {}}>Reset zoom</Button> : null}
        </div>
    )
};

export default EcgChart;
