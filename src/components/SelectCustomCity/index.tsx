import { Select, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import useApi from '@hooks/useApi'; // Đường dẫn đến useApi

interface SelectCustomCityProps<T> {
    name: keyof T;
    label?: string;
    control: Control<T>;
    endpoint: string; // Đường dẫn API endpoint
    endIcon?: React.ReactNode | string;
}

interface Option {
    value: string;
    label: string;
}

const SelectCustomCity: React.FC<SelectCustomCityProps<any>> = ({ name, label, control, endpoint, endIcon }) => {
    const { data, loading, error } = useApi<any>(endpoint);

    const renderAdornment = () => {
        if (endIcon) {
            return <InputAdornment position="end">{typeof endIcon === 'string' ? <img src={endIcon} alt={label} /> : endIcon}</InputAdornment>;
        }

        return null;
    };

    if (loading) {
        // Xử lý khi đang loading
    }

    if (error) {
        // Xử lý khi có lỗi
    }
    console.log('data', data);

    return (
        <Controller
            control={control}
            //@ts-ignore
            name={name}
            defaultValue=""
            render={({ field }) => (
                <Select {...field} label={label} fullWidth endAdornment={renderAdornment()}>
                    {data &&
                        data?.data.map((option: any, index: number) => (
                            <MenuItem key={index} value={option.cityName}>
                                {option.cityName}
                            </MenuItem>
                        ))}
                </Select>
            )}
        />
    );
};

export default SelectCustomCity;
