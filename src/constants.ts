import * as chartjs from 'chart.js'

export const options: chartjs.ChartOptions = {
    scales: {
        x: {
            type: 'linear',
            position: 'bottom',
            title: {
                display: true,
                text: 'Time',
            },
            min: 0,
            max: 30,
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
                mode: 'xy',
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
                wheel: {
                    enabled: true,
                }
            },
        },
    },
}
