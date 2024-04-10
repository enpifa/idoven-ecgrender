import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import '../styles/styles.css'

const InformationBox = () => {
    return (
        <CardContent>
            <Card className="informationBoxCard">
                <Typography variant="h6" align="left">How to display data</Typography>
                <Typography variant="body2" align="left">This web page loads data from a text file and renders the data in a chart.</Typography>
                <Typography variant="body2" align="left">To update the data file to render, you need to update or replace the "sampleData.txt" file from the public folder. The name of the file needs to remain the same.</Typography>
                <Typography variant="h6" align="left">Interacting with the chart</Typography>
                <Typography variant="body2" align="left">To move the chart forward and backward, hold shift + mouse click and move left/right.</Typography>
                <Typography variant="body2" align="left">To zoom in/out, you can either select an area on the chart with the mouse, or zoom in/out with your mouse pad.</Typography>
            </Card>
        </CardContent>
    )
}

export default InformationBox