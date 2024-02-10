import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, CircularProgress, Backdrop } from '@mui/material'; // Consolidated MUI imports
import Chart from './components/Chart';
import AlertSnackbar from './components/AlertSnackbar';
import Alerts from './components/AlertBox';
import { IIotEvent, initSocket } from '../../services/socket.service';
import { Placeholder } from './components/Placeholder';
import { MAIN_COLOR } from './consts';
const THRESHOLD = 80;
const MAX_DATA_POINTS = 15;
const MAX_ALERTS = 5;

const Dashboard = () => {
    const [soundLevels, setSoundLevels] = useState<number[]>([0]);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<IIotEvent[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const updateData = useCallback((eventData: IIotEvent) => {
        if (eventData.soundLevel > THRESHOLD) {
            setAlerts((prev) => {
                const newAlerts = [eventData, ...prev].slice(0, MAX_ALERTS);
                return newAlerts;
            });
            setOpenSnackbar(true);
        }
        setSoundLevels((prev) => [...prev.slice(-(MAX_DATA_POINTS - 1)), eventData.soundLevel]);
    }, []);

    useEffect(() => {
        const cleanup = initSocket(updateData, setIsConnected);
        return cleanup;
    }, [updateData]);

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason !== 'clickaway') setOpenSnackbar(false);
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height={600}>
            <Backdrop open={!isConnected} style={{ zIndex: 1 }} />

            {!isConnected ? <Placeholder /> : null}
            {soundLevels.length > 1 ? <Grid container justifyContent="center" >
                <Grid item xs={9}>
                    <Chart soundLevels={soundLevels} />
                </Grid>
                <Grid item xs={3} display="flex" >
                    <Alerts alerts={alerts} />
                </Grid>
            </Grid> : null}
            <AlertSnackbar open={openSnackbar} handleClose={handleCloseSnackbar} />

        </Box>

    );
};

export default Dashboard;
