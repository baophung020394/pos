import { Select, MenuItem, InputAdornment } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface SelectFieldsProps<T> {
    name: keyof T;
    label?: string;
    control: Control<T>;
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    options: string[];
}

function SelectFields<T>({ name, label, control, startIcon, endIcon, options }: SelectFieldsProps<T>) {
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
                <Select {...field} label={label} fullWidth startAdornment={renderAdornment('start')} endAdornment={renderAdornment('end')}>
                    {options.map((option: string, index: number) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            )}
        />
    );
}

export default SelectFields;
