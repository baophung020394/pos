import React, { ReactNode } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ModelCustomProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    okButtonText?: string;
    cancelButtonText?: string;
    onOk?: () => void;
    onCancel?: () => void;
    className?: string;
}

const ModelCustom: React.FC<ModelCustomProps> = ({ isOpen, onClose, children, title = '', okButtonText = '', cancelButtonText = '', onOk, onCancel, className }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className={className}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <div>{children}</div>
            </DialogContent>
            {(onOk || onCancel) && (
                <DialogActions>
                    {onCancel && (
                        <Button onClick={onCancel} color="primary">
                            {cancelButtonText || 'Cancel'}
                        </Button>
                    )}
                    {onOk && (
                        <Button onClick={onOk} color="primary">
                            {okButtonText || 'OK'}
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ModelCustom;
