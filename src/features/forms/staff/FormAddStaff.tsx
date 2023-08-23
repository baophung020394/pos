import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import TextareaPolicy from '@components/TextareaFieldsPolicy';
import { Role, RoleRequest, RoleResponse, RoleResponseAdd } from '@models/role';
import { Box, Checkbox, Collapse, FormControlLabel, Input, List, ListItem, ListItemIcon, ListItemText, TextareaAutosize, TextField, Typography } from '@mui/material';
import { showErrorToast, showSuccessToast } from '@store/actions/actionToast';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '../../../assets/images/customer/close.svg';
import SaveIcon from '../../../assets/images/customer/save.svg';
import CheckedIcon from '../../../assets/images/customer/checkboxicon.svg';
import UncheckIcon from '../../../assets/images/customer/uncheckbox.svg';
import CollapseBlackIcon from '../../../assets/images/branch/collapse-black.svg';
import AddMoreRoleIcon from '../../../assets/images/staff/addmorerole.svg';
import './formaddstaff.scss';
import useApi from '@hooks/useApi';
import { Staff, StaffResponse } from '@models/user/staff';
import SelectStaffBranchs from '@components/SelectStaffBranchs';
import SelectStaffRoles from '@components/SelectStaffRoles';
import DropdownIcon from '../../../assets/images/customer/dropdown.svg';

interface FormAddStaffProps {
    onClose: () => void;
    onAddSuccess: (role: Staff) => void;
}
const FormAddStaff: React.FC<FormAddStaffProps> = ({ onClose, onAddSuccess }) => {
    const [permissionsList, setPermissionsList] = useState<StaffResponse>();
    const { handleSubmit, control } = useForm<Staff>();
    const [loading, setLoading] = useState<boolean>(false);
    const apiUrl = '/api/Staff/save';
    const { data } = useApi<StaffResponse>(apiUrl);

    const [openIndexes, setOpenIndexes] = useState<any>([]);

    useEffect(() => {
        console.log('setPermissionsList', data);
        if (data?.success) {
            setPermissionsList(data);
        } else if (!data?.success && data?.errors) {
            showErrorToast(data?.errors[0] || '');
        }
    }, [data]);

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
                        <SelectStaffRoles name="roleName" label="" control={control} endpoint="/api/Role/list" endIcon={DropdownIcon} />
                    </div>
                    <div className="information--form-control">
                        <label>Chi nhánh</label>
                        <SelectStaffBranchs name="branchName" label="" control={control} endpoint="/api/Branch/list" endIcon={DropdownIcon} />
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
