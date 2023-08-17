import { TextField, InputAdornment } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface TextareaProps<T> {
    name: keyof T;
    label?: string;
    control: Control<T>;
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    rows?: number; // Thêm thuộc tính rows
}

function TextareaFields<T>({ name, label, control, startIcon, endIcon, onKeyDown, rows }: TextareaProps<T>) {
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
            // @ts-ignore
            name={name}
            // @ts-ignore
            defaultValue=""
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    fullWidth
                    multiline
                    rows={rows} // Sử dụng thuộc tính rows ở đây
                    onKeyDown={onKeyDown}
                    InputProps={{
                        startAdornment: renderAdornment('start'),
                        endAdornment: renderAdornment('end'),
                    }}
                />
            )}
        />
    );
}

export default TextareaFields;
