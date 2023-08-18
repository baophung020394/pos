import useApi from '@hooks/useApi';
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
interface SelectCustomCityProps {
    name: keyof FormData; // Chỉnh sửa ở đây
    label?: string;
    control: Control<FormData>;
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    className?: string;
    endpoint: string; // Đường dẫn API endpoint
}

const SelectCustomCity: React.FC<SelectCustomCityProps> = ({ endpoint, name, label, control, startIcon, endIcon, className }) => {
    const { data, loading, error } = useApi<any>(endpoint);
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
