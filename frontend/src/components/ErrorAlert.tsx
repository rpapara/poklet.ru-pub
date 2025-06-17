import { Alert, Snackbar } from '@mui/material';
import type { SyntheticEvent } from 'react';

interface ErrorAlertProps {
  message: string;
  open: boolean;
  onClose?: () => void;
}

export default function ErrorAlert({ message, open, onClose }: ErrorAlertProps) {
  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    onClose?.();
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
