import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormData {
    phone: string;
    password: string;
    passwordConfirm?: string;
}

interface InputFieldLoginFormProps {
    name: keyof FormData;
    label?: string;
    placeholder?: string;
    control: Control<FormData>;
    type?: 'text' | 'password';
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    className?: string;
}

const InputFieldLoginForm: React.FC<InputFieldLoginFormProps> = ({ name, className, label, control, type = 'text', startIcon, endIcon, placeholder }) => {
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
            name={name}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    className={className}
                    {...field}
                    label={label}
                    fullWidth
                    placeholder={placeholder}
                    type={type === 'password' && !passwordVisible ? 'password' : 'text'}
                    InputProps={{
                        startAdornment: renderAdornment('start'),
                        endAdornment: renderAdornment('end'),
                    }}
                />
            )}
        />
    );
};

export default InputFieldLoginForm;
