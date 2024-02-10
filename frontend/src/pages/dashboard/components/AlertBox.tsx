import { Box, Typography, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MAIN_COLOR } from '../consts';
import { IIotEvent } from '../../../services/socket.service';

const easing = [0.6, -0.05, 0.01, 0.99];
const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};
const alertVariants = {
    initial: { opacity: 0, scale: 0.95, x: 50 },
    animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, ease: easing } },
    exit: { opacity: 0, scale: 0.95, x: -50, y: -100, transition: { duration: 0.4, ease: easing } },
};

const AlertBox = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5),
    border: `1.5px solid`,
    borderRadius: '5px',
    borderColor: theme.palette.primary.main,
}));



const Alerts = ({ alerts }: { alerts: IIotEvent[] }) => {
    const AlertDetails = ({ alert }: { alert: IIotEvent }) => (
        <Box>
            <Typography mx={1} color="error" fontSize={18} fontWeight="bold">
                Alert logged
            </Typography>
            <Typography mx={2} sx={{ color: MAIN_COLOR }}>
                <strong>Time:</strong> {new Date(alert.timestamp).toLocaleTimeString()}
            </Typography>
            <Typography mx={2} sx={{ color: MAIN_COLOR }} variant="body1">
                <strong>Sound:</strong> {alert.soundLevel.toFixed(2)} dB
            </Typography>
        </Box>
    );
    const AlertsPlaceholder = () => {
        return (
            <Typography variant="h5" align="center" sx={{ color: MAIN_COLOR }}>
                No alerts currently logged:)
            </Typography>
        )
    }
    return (
        < Box minHeight={400} >
            <Typography variant="h2" align="center" sx={{ color: MAIN_COLOR }}>
                Alerts
            </Typography>
            <Box width={300} maxHeight={400}  >
                {alerts.length == 0 ? <AlertsPlaceholder /> :
                    <AnimatePresence>
                        <motion.div variants={stagger} initial="initial" animate="animate" exit="exit">
                            {alerts.map((alert) => (
                                <motion.div key={alert.deviceId} variants={alertVariants} initial="initial" animate="animate" exit="exit" layout>
                                    <AlertBox>
                                        <AlertDetails alert={alert} />
                                    </AlertBox>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>}
            </Box>
        </Box >)
}

export default Alerts;
