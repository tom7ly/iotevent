import { SECONDARY_COLOR } from "../consts";
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';

export function Placeholder() {
    return (
            <Box position="fixed" width={500} bottom={100} display="flex" gap={5} bgcolor="white" borderRadius={5} padding={2}  alignItems="center" zIndex={1500}>
                <Typography variant="h4" align="center" sx={{ color: SECONDARY_COLOR }}>Connecting to the server</Typography>
                <CircularProgress size="50px" style={{  color: SECONDARY_COLOR }} />
            </Box>
    )
}