import { Select, MenuItem, InputAdornment } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormData {
    CustomerCode: string;
    CustomerName: string;
    Gender: string;
    PhoneNumber: string;
    BirthDay: string;
    Email: string;
    Address: string;
    Note: string;
    Status: string;
    TaxCode: string;
    Hastag: string;
    FacebookLink: string;
    Debt: string;
    AreaCityId: string;
    AreaDistrictId: string;
    CustomerGroupId: string;
    CustomerGroupName: string;
    email: string;
}

interface SelectFieldsProps {
    name: keyof FormData;
    label?: string;
    control: Control<FormData>;
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    options: string[]; // Đây là mảng options bạn cần truyền vào
    className?: string;
}

const SelectFields: React.FC<SelectFieldsProps> = ({ name, label, control, startIcon, endIcon, options, className }) => {
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
                <Select {...field} label={label} fullWidth className={className} startAdornment={renderAdornment('start')} endAdornment={renderAdornment('end')}>
                    {options.map((option: string, index: number) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            )}
        />
    );
};

export default SelectFields;
