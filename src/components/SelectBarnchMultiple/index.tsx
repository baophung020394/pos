import CustomButton from '@components/Button';
import useApi from '@hooks/useApi';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import AddMoreRoleIcon from '../../assets/images/staff/addmorerole.svg';
import OpenNewTabIcon from '../../assets/images/staff/open-new-tab.svg';
import './select.scss';

interface SelectBranchMultipleProps {
    endpoint: string; // Đường dẫn API endpoint
    minHeight?: number | string;
    maxHeight?: number | string;
    isOpen?: boolean;
    onChange?: (value: string) => void;
    onClick?: () => void;
    onClose?: () => void;
}

const SelectBranchMultiple: React.FC<SelectBranchMultipleProps> = ({ endpoint, minHeight, maxHeight, isOpen, onClick, onClose, onChange }) => {
    const { data, loading, error } = useApi<any>(endpoint);
    const [selectCustomBoxPosition, setSelectCustomBoxPosition] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        const selectCustomRef = document.querySelector('.select-branch-mul');
        const selectCustomBoxRef = document.querySelector('.select-branch-mul__box');

        if (selectCustomRef && selectCustomBoxRef) {
            const rect = selectCustomRef.getBoundingClientRect();
            const top = rect.bottom; // Đặt vị trí top bằng bottom của .select-branch-mul
            const left = rect.left; // Đặt vị trí left bằng left của .select-branch-mul
            const width = rect.width; // Đặt vị trí left bằng left của .select-branch-mul
            setSelectCustomBoxPosition({ top, left, width });
        }
    }, [isOpen]);

    const onChangeValue = (value: string) => {
        if (!onChange) return;
        onChange(value);
    };

    return (
        <Box className="select-branch-mul" style={{ minHeight: minHeight, maxHeight: maxHeight }} onClick={onClick}>
            {isOpen ? (
                <Box
                    className="select-branch-mul__box"
                    style={{
                        top: selectCustomBoxPosition.top - 150,
                        left: selectCustomBoxPosition.left,
                        width: selectCustomBoxPosition.width,
                    }}
                >
                    <Box className="select-branch-mul__search">
                        <input type="text" placeholder="Tìm kiếm vai trò" />
                    </Box>
                    <Box className="select-branch-mul__button">
                        <CustomButton
                            text="Thêm vai trò"
                            backgroundColor="transparent"
                            backgroundColorHover="transparent"
                            icon={AddMoreRoleIcon}
                            onClick={() => {}}
                            className="btn-add"
                            boxShadow="none"
                        />
                    </Box>
                    <Box className="select-branch-mul__items">
                        {data?.data.map((item: any) => (
                            <Typography component="p">{item.branchName}</Typography>
                        ))}
                    </Box>
                    <Box className="select-branch-mul__button select-branch-mul__button--right">
                        <CustomButton
                            text="Thêm vai trò"
                            backgroundColor="transparent"
                            backgroundColorHover="transparent"
                            icon={OpenNewTabIcon}
                            onClick={() => {}}
                            className="btn-role"
                            boxShadow="none"
                        />
                    </Box>
                </Box>
            ) : null}

            <Box className="select-branch-mul__icon">
                <img alt="icon-down" src={DropdownIcon} />
            </Box>
        </Box>
    );
};

export default SelectBranchMultiple;
