import React, { useEffect, useState } from 'react';
import EcgChart from './EcgChart'

const EcgChartManager: React.FC = () => {
    const [ecgData, setEcgData] = useState<(number | null)[][]>([]);
  
    useEffect(() => {
      // Load and parse ECG data from text file
        const fetchData = async () => {
            try {
                console.log("Getting data...")
                const response = await fetch(process.env.PUBLIC_URL + '/sampleData.txt');
                const text = await response.text();
                console.log("Parsing data...")
                const parsedData = parseEcgData(text);
                setEcgData(parsedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
  
        fetchData();
    }, []);

    useEffect(() => {
        if (ecgData) {
            console.log("We got ecgData!!", ecgData.length)
        }
    }, [ecgData])

    const parseEcgData = (text: string): (number | null)[][] => {
        // Split text into lines and parse each line
        const lines = text.trim().split('\n');
        const data: (number | null)[][] = [];
    
        lines.forEach((line) => {
            const values = line.split(',');
            const parsedValues = values.map((value) => parseFloat(value.trim()) || null);
            // console.log(parsedValues)

            data.push(parsedValues);
        });

        return data;
    };

    return ecgData.length ? <EcgChart ecgData={ecgData} /> : null;
};

export default EcgChartManager;
