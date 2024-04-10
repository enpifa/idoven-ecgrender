import React from 'react'
import '../styles/styles.css';
import { Typography, Avatar, Stack } from '@mui/material'

const source = process.env.PUBLIC_URL + "/Logo.png"

const Header = () => {
    return (
        <header className="App-header">
            <Stack direction="row" spacing={2}>
                <Avatar alt="idoven" src={source} />
                <Typography variant="h5">Idoven.ai Coding Challenge</Typography>
            </Stack>
        </header>
    )
}

export default Header