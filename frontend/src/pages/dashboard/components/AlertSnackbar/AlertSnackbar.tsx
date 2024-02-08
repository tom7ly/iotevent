import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

interface AlertSnackbarProps {
  open: boolean;
  handleClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

export default function AlertSnackbar({ open, handleClose }: AlertSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        animation: `${pulse} 2s infinite`,
      }}
    >
      <Alert
        onClose={handleClose}
        severity="warning"
        sx={{
          width: '100%',
          fontSize: '1.5rem',
        }}
      >
        Sound level is above the threshold!
      </Alert>
    </Snackbar>
  );
}