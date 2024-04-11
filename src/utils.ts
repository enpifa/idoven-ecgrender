import * as chartjs from 'chart.js'

export const getDatasets = (data:(number | null)[][]): chartjs.ChartDataset[] => {
    return [
        {
            label: 'Row 1',
            data: data.map((row) => row[1]),
            borderColor: 'blue',
            // backgroundColor: 'blue',
            borderWidth: 0.2,
            fill: false,
        },
        {
            label: 'Row 2',
            data: data.map((row) => row[2]),
            borderColor: 'green',
            backgroundColor: 'green',
            borderWidth: 1,
            fill: false,
        },
        {
            label: 'Row 3',
            data: data.map((row) => row[3]),
            borderColor: 'red',
            backgroundColor: 'red',
            borderWidth: 1,
            fill: false,
        },
        {
            label: 'Row 4',
            data: data.map((row) => row[4]),
            borderColor: 'yellow',
            backgroundColor: 'yellow',
            borderWidth: 1,
            fill: false,
        },
    ]
}

export const parseData = (data: string) => {
    const lines: string[] = data.trim().split('\n');
    const parsedChunk: (number | null)[][] = lines.map((line) => {
        const values: string[] = line.split(',');
        return values.map((value) => parseFloat(value.trim()) || null);
    });

    return parsedChunk
}