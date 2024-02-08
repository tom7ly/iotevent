import { useState, useEffect } from 'react';
import { IIotEvent, initSocket } from '../../services/socket.service';
import Chart from './components/Chart/Chart'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { keyframes } from '@mui/system';
import AlertSnackbar from './components/AlertSnackbar/AlertSnackbar';
const THRESHOLD = 70




const Dashboard = () => {
    const [labels, setLabels] = useState<string[]>([]);
    const [soundLevels, setSoundLevels] = useState<number[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const cleanup = initSocket((eventData: IIotEvent) => {
            const dateObject = new Date(eventData.timestamp);
            const label = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setLabels(prevLabels => [...prevLabels, label]);
            setSoundLevels(prevSoundLevels => {
                if (eventData.soundLevel > THRESHOLD) {
                    setOpenSnackbar(true);
                }
                return [...prevSoundLevels, eventData.soundLevel];
            });
        });
        return cleanup;
    }, []);
    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Chart labels={labels} soundLevels={soundLevels} />
            <AlertSnackbar open={openSnackbar} handleClose={handleClose} /> 
        </main>
    );
};

export default Dashboard;