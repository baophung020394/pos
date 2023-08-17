import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface InputProps<T> {
    name: keyof T;
    label?: string;
    className?: string;
    placeholder?: string;
    control: Control<T>;
    type?: 'text' | 'password' | 'date';
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
}

function Input<T>({ name, label, control, type, startIcon, endIcon, placeholder, className }: InputProps<T>) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
    };

    const renderAdornment = (position: 'start' | 'end') => {
        const icon = position === 'start' ? startIcon : endIcon;

        if (icon) {
            return (
                <InputAdornment position={position}>
                    {typeof icon === 'string' ? (
                        <img src={icon} alt={label} />
                    ) : (
                        <IconButton onClick={position === 'end' && type === 'password' ? togglePasswordVisibility : undefined} edge={position} tabIndex={-1}>
                            {position === 'end' && type === 'password' ? passwordVisible ? <Visibility /> : <VisibilityOff /> : icon}
                        </IconButton>
                    )}
                </InputAdornment>
            );
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
                    className={className}
                    {...field}
                    label={label}
                    fullWidth
                    placeholder={placeholder}
                    type={type}
                    InputProps={{
                        startAdornment: renderAdornment('start'),
                        endAdornment: renderAdornment('end'),
                    }}
                />
            )}
        />
    );
}

export default Input;
