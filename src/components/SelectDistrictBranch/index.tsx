import useApi from '@hooks/useApi';
import { Select, MenuItem, InputAdornment } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormData {
    BranchId: string;
    BranchName: string | null;
    BranchCode: string | null;
    BranchMasterName: string | null;
    Address: string | null;
    AreaCityName: string | null;
    AreaDistrictName: string | null;
    AreaCommuneName: string | null;
    StatusName: string | null;
    PhoneNumber: string | null;
    Default: boolean;
    Status: boolean;
    AreaCityId: string | null;
    AreaDistrictId: string | null;
}
interface SelectDistrictBranchProps {
    name: keyof FormData; // Chỉnh sửa ở đây
    label?: string;
    control: Control<FormData>;
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    className?: string;
    endpoint: string; // Đường dẫn API endpoint
}

const SelectDistrictBranch: React.FC<SelectDistrictBranchProps> = ({ endpoint, name, label, control, startIcon, endIcon, className }) => {
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
                            <MenuItem key={index} value={option.districtName}>
                                {option.districtName}
                            </MenuItem>
                        ))}
                </Select>
            )}
        />
    );
};

export default SelectDistrictBranch;
