import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import SelectBranchMultiple from '@components/SelectBarnchMultiple';
import SelectRoleMultiple from '@components/SelectRoleMultiple';
import SelectStaffBranchs from '@components/SelectStaffBranchs';
import useApi from '@hooks/useApi';
import { Staff, StaffResponse } from '@models/user/staff';
import { Input, TextField, Typography } from '@mui/material';
import { showErrorToast, showSuccessToast } from '@store/actions/actionToast';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DropdownIcon from '../../../assets/images/customer/dropdown.svg';
import SaveIcon from '../../../assets/images/customer/save.svg';
import AddMoreRoleIcon from '../../../assets/images/staff/addmorerole.svg';
import './formaddstaff.scss';

interface FormAddStaffProps {
    onClose: () => void;
    onAddSuccess: (role: Staff) => void;
}
const FormAddStaff: React.FC<FormAddStaffProps> = ({ onClose, onAddSuccess }) => {
    const [isOpenItems, setIsOpenItems] = useState<boolean>(false);
    const [isOpenBranchs, setIsOpenBranchs] = useState<boolean>(false);
    const { handleSubmit, control, setValue } = useForm<Staff>();
    const [loading, setLoading] = useState<boolean>(false);
    const apiUrl = '/api/Staff/save';
    const { data } = useApi<StaffResponse>(apiUrl);

    const [openIndexes, setOpenIndexes] = useState<any>([]);

    const handleOpenItems = () => setIsOpenItems(true);
    const handleOpenBranchs = () => setIsOpenBranchs(true);
    const handleCloseItems = () => {
        setIsOpenItems(false);
    };
    const handleCloseBranchs = () => {
        setIsOpenBranchs(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            const selectCustomBoxRef = document.querySelector('.select-role-mul__box');
            const selectCustomRef = document.querySelector('.select-role-mul');

            if (selectCustomBoxRef && selectCustomRef && !selectCustomBoxRef.contains(event.target) && !selectCustomRef.contains(event.target)) {
                setIsOpenItems(false);
            }
        };

        if (isOpenItems) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpenItems]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            const selectCustomBoxRef = document.querySelector('.select-branch-mul__box');
            const selectCustomRef = document.querySelector('.select-branch-mul');

            if (selectCustomBoxRef && selectCustomRef && !selectCustomBoxRef.contains(event.target) && !selectCustomRef.contains(event.target)) {
                setIsOpenBranchs(false);
            }
        };

        if (isOpenBranchs) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpenBranchs]);

    const handleToggle = (index: string) => {
        const currentIndex = openIndexes.indexOf(index);
        const newOpenIndexes = [...openIndexes];

        if (currentIndex === -1) {
            newOpenIndexes.push(index);
        } else {
            newOpenIndexes.splice(currentIndex, 1);
        }

        setOpenIndexes(newOpenIndexes);
    };

    const isItemOpen = (index: string) => {
        return openIndexes.includes(index);
    };

    const onSubmit = async (data: Staff) => {
        setLoading(true);
        console.log('data', data);
        const url = '/api/Role/save';
        const response: any = await axiosClient.post(url, null, { params: data });
        console.log('response', response);
        if (response?.data.success) {
            onClose();
            setLoading(false);
            showSuccessToast('Thêm nhân viên thành công');
        }
    };

    return (
        <form className="form-add-staff" onSubmit={handleSubmit(onSubmit)}>
            <div className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm mới vai trò
                </Typography>
            </div>

            <div className="information">
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Tên nhân viên</label>
                        <Controller name="firstName" control={control} render={({ field }) => <Input type="text" className="input-field" placeholder="Nhập tên nhân viên" {...field} />} />
                    </div>
                    <div className="information--form-control">
                        <label>Số điện thoại</label>
                        <Controller name="phone" control={control} render={({ field }) => <Input {...field} type="text" className="input-field" placeholder="Nhập số điện thoại" />} />
                    </div>
                </div>
                <div className="information--col textarea">
                    <div className="information--form-control">
                        <label>Ghi chú</label>
                        <Controller name="note" control={control} render={({ field }) => <TextField {...field} className="input-field" placeholder="Nhập ghi chú" rows={3} multiline />} />
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Vai trò</label>
                        <SelectRoleMultiple
                            endpoint="/api/Role/list"
                            minHeight={40}
                            maxHeight={40}
                            onChange={(value: string) => {
                                setValue('roleName', value);
                            }}
                            onClick={handleOpenItems}
                            onClose={handleCloseItems}
                            isOpen={isOpenItems}
                        />
                        {/* {isOpenItems ? <div className="layer" onClick={() => handleCloseItems()}></div> : null} */}
                        {/* <SelectStaffRoles name="roleName" label="" control={control} endpoint="/api/Role/list" endIcon={DropdownIcon} /> */}
                    </div>
                    <div className="information--form-control">
                        <label>Chi nhánh</label>
                        <SelectBranchMultiple
                            endpoint="/api/Branch/list"
                            minHeight={40}
                            maxHeight={40}
                            onChange={(value: string) => {
                                setValue('branchName', value);
                            }}
                            onClose={handleCloseBranchs}
                            onClick={handleOpenBranchs}
                            isOpen={isOpenBranchs}
                        />
                        {/* <SelectStaffBranchs name="branchName" label="" control={control} endpoint="/api/Branch/list" endIcon={DropdownIcon} /> */}
                    </div>
                </div>
                <div className="information--col addmore-role">
                    <div className="information--form-control">
                        <img src={AddMoreRoleIcon} alt="" />
                        <label>Gán thêm vai trò</label>
                    </div>
                </div>
            </div>

            <div className="information--buttons">
                <CustomButton
                    text="Huỷ"
                    backgroundColor="#ffffff"
                    backgroundColorHover="#ffffff"
                    boxShadow="none"
                    className="btn-cancel"
                    type="button"
                    minHeight={35}
                    maxHeight={35}
                    onClick={onClose}
                />
                <CustomButton
                    text="Lưu"
                    backgroundColor="#007AFF"
                    backgroundColorHover="#007AFF"
                    boxShadow="none"
                    icon={SaveIcon}
                    className={`btn-submit`}
                    type="submit"
                    disabled={loading}
                    minHeight={35}
                    maxHeight={35}
                />
            </div>
        </form>
    );
};

export default FormAddStaff;
