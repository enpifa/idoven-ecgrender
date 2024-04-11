import React from 'react';
import Chart from 'chart.js/auto';
import '../styles/styles.css'
import { Button, Typography } from '@mui/material'
import { options } from '../constants'
import { getDatasets } from '../utils'
import { FileContext } from '../context'

// defines a references to reset the chart zoom to see the chart from the initial position
let resetZoom: (mode: 'none') => void;

const EcgChart = ({ ecgData }: {ecgData?: (number | null)[][]}) => {
    const chartRef = React.useRef<HTMLCanvasElement | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [hasData, setHasData] = React.useState<boolean>(false)
    let chartInstance: Chart | null = null;
    const context = React.useContext(FileContext)

    React.useEffect(() => {
        if (context?.data && context?.data.length !== 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance) {
                    // Destroy existing chart instance
                    (chartInstance as Chart).destroy();
                }
                console.log("Loading chart...")
                setHasData(true)
                setIsLoading(true)
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: context?.data.map((row) => row[0]),
                        datasets: getDatasets(context?.data),
                    },
                    options,
                });
                console.log("Chart loaded!")
                setIsLoading(false)
                resetZoom = chartInstance.resetZoom
            }
        } else {
            setHasData(false)
        }
        setIsLoading(false)

        return () => {
            if (chartInstance) {
                (chartInstance as Chart).destroy();
            }
        };
    }, [context?.data]);

    return (
        <div>
            {hasData && isLoading ? <Typography>Loading chart, this might take a few seconds...</Typography> : null}
            <div className={isLoading ? 'canvasLoading' : 'canvasLoaded'}>
                <canvas ref={chartRef}></canvas>
            </div>
            {hasData && !isLoading ? <Button variant="contained" color="secondary" onClick={() => resetZoom ? resetZoom('none') : () => {}}>Reset zoom</Button> : null}
        </div>
    )
};

export default EcgChart;
