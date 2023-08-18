import { TextField, InputAdornment } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormData {
    PricePolicyNameCode: string | null;
    pricePolicyName: string | null;
    Note: string | null;
}

interface TextareaPolicyProps {
    name: keyof FormData;
    label?: string;
    placeholder?: string;
    control: Control<FormData>;
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    type?: string;
    rows?: number;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

const TextareaPolicy: React.FC<TextareaPolicyProps> = ({ name, label, control, startIcon, endIcon, placeholder, onKeyDown, rows }) => {
    const renderAdornment = (position: 'start' | 'end') => {
        const icon = position === 'start' ? startIcon : endIcon;

        if (icon) {
            return <InputAdornment position={position}>{typeof icon === 'string' ? <img src={icon} alt={label} /> : <span>{icon}</span>}</InputAdornment>;
        }

        return null;
    };

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    rows={rows}
                    {...field}
                    label={label}
                    fullWidth
                    placeholder={placeholder}
                    multiline
                    onKeyDown={onKeyDown} // Được thêm vào đây
                    InputProps={{
                        startAdornment: renderAdornment('start'),
                        endAdornment: renderAdornment('end'),
                    }}
                ></TextField>
            )}
        />
    );
};

export default TextareaPolicy;
