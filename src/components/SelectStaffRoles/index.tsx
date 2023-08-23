import useApi from '@hooks/useApi';
import { Select, MenuItem, InputAdornment } from '@mui/material';
import React, { useState, useRef } from 'react';
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

interface SelectStaffRoleProps {
    name: keyof FormData; // Chỉnh sửa ở đây
    label?: string;
    control: Control<FormData>;
    startIcon?: React.ReactNode | string;
    endIcon?: React.ReactNode | string;
    className?: string;
    endpoint: string; // Đường dẫn API endpoint
}

const SelectStaffRoles: React.FC<SelectStaffRoleProps> = ({ endpoint, name, label, control, startIcon, endIcon, className }) => {
    const { data, loading, error } = useApi<any>(endpoint);
    const [searchValue, setSearchValue] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Thêm biến state cho trạng thái mở/đóng Select
    const selectRef = useRef(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const renderAdornment = (position: 'start' | 'end') => {
        const icon = position === 'start' ? startIcon : endIcon;

        if (icon) {
            return <InputAdornment position={position}>{typeof icon === 'string' ? <img src={icon} alt={label} /> : <span>{icon}</span>}</InputAdornment>;
        }

        return null;
    };

    const filteredData = data?.data.filter((option: any) => option.roleName.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field }) => (
                <div>
                    <Select
                        {...field}
                        label={label}
                        fullWidth
                        className={className}
                        open={isOpen} // Sử dụng biến state để xác định trạng thái mở/đóng Select
                        onClick={() => {
                            setIsOpen(true); // Mở Select khi click vào
                        }}
                        onClose={() => {
                            setIsOpen(false); // Đóng Select khi click ngoài
                        }}
                        ref={selectRef}
                        // iconComponent={ArrowDropDownIcon}
                    >
                        <input type="text" placeholder="search" value={searchValue} onChange={handleSearchChange} onClick={(e) => e.stopPropagation()} />
                        {filteredData &&
                            filteredData.map((option: any, index: number) => (
                                <MenuItem
                                    key={index}
                                    value={option.roleId}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false); // Đóng Select khi chọn một tùy chọn
                                    }}
                                >
                                    {option.roleName}
                                </MenuItem>
                            ))}
                    </Select>
                </div>
            )}
        />
    );
};

export default SelectStaffRoles;
