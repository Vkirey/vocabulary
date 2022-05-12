import * as React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface ConfirmDialogProps {
    title: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
          color="info"
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            onConfirm();
          }}
          color="info"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
