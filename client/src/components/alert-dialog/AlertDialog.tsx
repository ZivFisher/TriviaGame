import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { FC, ReactElement, useState } from 'react';
import './AlertDialog.scss';


interface AlertDialogProps {
    question?: string;
    description?: string;
    onConfirm?: () => void;
    showCancelButton?: boolean;
    triggerButton: (onClick: () => void) => ReactElement;
}

export const AlertDialog: FC<AlertDialogProps> = ({
    question,
    description = null,
    onConfirm,
    showCancelButton = false,
    triggerButton
}) => {

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleConfirm = (): void => {
        if (onConfirm) onConfirm()
        setOpen(false);
    };

    return (
        <>
            {triggerButton(() => setOpen(true))}

            <Dialog
                dir="rtl"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box
                    className='dialog-box'
                    sx={{
                        borderRadius: 16
                    }}
                >

                    <DialogTitle
                        id="alert-dialog-title"
                        className='dialog-title'
                    >
                        {question ? question : 'האם אתה בטוח?'}
                    </DialogTitle>

                    {description &&
                        <DialogContent
                            className="dialog-content"
                        >
                            <DialogContentText id="alert-dialog-description">
                                {description}
                            </DialogContentText>
                        </DialogContent>}
                    <DialogActions
                        className='dialog-actions'
                    >
                        {showCancelButton &&
                            <Button
                                className='cancel-btn'
                                onClick={handleClose}
                            >
                                ביטול
                            </Button>
                        }
                        <Button
                            variant='contained'
                            className='confirm-btn'
                            onClick={handleConfirm}
                            autoFocus
                        >
                            אישור
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </ >
    );
}