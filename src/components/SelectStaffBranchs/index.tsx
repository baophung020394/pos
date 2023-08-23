import useApi from '@hooks/useApi';
import { Select, MenuItem, InputAdornment } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormData {
    userId: string;
    firstName: string | null;
    lastName: string | null;
    fulName: string | null;
    phone: string | null;
    roleName: string | null;
    branchName: string | null;
    createdDate: string;
    createdName: string | null;
    modifiedDate: string | null;
    modifiedName: string | null;
    status: string | null;
    note: string | null;
}
interface SelectStaffBranchsProps {
    name: keyof FormData; // Chỉnh sửa ở đây
    label?: string;
    control: Control<FormData>;
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    className?: string;
    endpoint: string; // Đường dẫn API endpoint
}

const SelectStaffBranchs: React.FC<SelectStaffBranchsProps> = ({ endpoint, name, label, control, startIcon, endIcon, className }) => {
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
                            <MenuItem key={index} value={option.branchId}>
                                {option.branchName}
                            </MenuItem>
                        ))}
                </Select>
            )}
        />
    );
};

export default SelectStaffBranchs;
