import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import TextareaPolicy from '@components/TextareaFieldsPolicy';
import { Role, RoleRequest, RoleResponse, RoleResponseAdd } from '@models/role';
import { Box, Checkbox, Collapse, FormControlLabel, Input, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { showErrorToast, showSuccessToast } from '@store/actions/actionToast';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '../../assets/images/customer/close.svg';
import SaveIcon from '../../assets/images/customer/save.svg';
import CheckedIcon from '../../assets/images/customer/checkboxicon.svg';
import UncheckIcon from '../../assets/images/customer/uncheckbox.svg';
import CollapseBlackIcon from '../../assets/images/branch/collapse-black.svg';
import CollapseBlueIcon from '../../assets/images/branch/collapse-blue.svg';
import { Check, ExpandLess, ExpandMore } from '@mui/icons-material';
import './formaddrole.scss';
import useApi from '@hooks/useApi';
import { useNavigate } from 'react-router-dom';

interface AddRolePageProps {
    onClose?: () => void;
}
const AddRolePage: React.FC<AddRolePageProps> = ({ onClose }) => {
    const [permissionsList, setPermissionsList] = useState<RoleResponseAdd>();
    const { handleSubmit, control } = useForm<RoleRequest>();
    const [loading, setLoading] = useState<boolean>(false);
    const apiUrl = '/api/Role/-1';
    const { data } = useApi<RoleResponseAdd>(apiUrl);
    const navigate = useNavigate();
    const [openIndexes, setOpenIndexes] = useState<any>([]);

    useEffect(() => {
        console.log('setPermissionsList', data);
        if (data?.success) {
            setPermissionsList(data);
        } else if (!data?.success && data?.errors) {
            showErrorToast(data?.errors[0] || '');
        }
    }, [data]);

    const randomNumber = Math.floor(Math.random() * 9999);

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

    const onSubmit = async (data: RoleRequest) => {
        setLoading(true);
        console.log('data', data);
        const url = '/api/Role/save';
        const response: any = await axiosClient.post(url, null, { params: data });
        console.log('response', response);
        if (response?.data.success) {
            setLoading(false);
            showSuccessToast('Thêm chính sách thành công');
            navigate('/roles');
        }
    };

    return (
        <form className="form-add-role" onSubmit={handleSubmit(onSubmit)}>
            <div className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm mới vai trò
                </Typography>
                <div className="heading--option">
                    <CustomButton
                        text="Huỷ"
                        backgroundColor="#ffffff"
                        backgroundColorHover="#ffffff"
                        boxShadow="none"
                        className="btn-cancel"
                        type="button"
                        minHeight={35}
                        maxHeight={35}
                        onClick={() => {
                            navigate('/roles');
                        }}
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
            </div>

            <div className="information">
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Tên vai trò</label>
                        <Controller name="roleName" control={control} render={({ field }) => <Input type="text" className="input-field" placeholder="Nhập tên vai trò" {...field} />} />
                    </div>
                    <div className="information--form-control">
                        <label>Ghi chú</label>
                        <Controller name="note" control={control} render={({ field }) => <Input {...field} type="text" className="input-field" placeholder="Nhập ghi chú" />} />
                    </div>
                </div>
            </div>

            <div className="permissions">
                <Typography variant="h3" component="h3">
                    Phân quyền
                </Typography>

                <Box className="permissions--wrap">
                    {permissionsList?.data.functions.map((permission, indx) => (
                        <div key={`${permission.functionId}-${indx}`} className={`permissions--wrap__checkboxs ${isItemOpen(`${permission.functionId}`) ? 'actived' : ''}`}>
                            <Box className="permissions--wrap__checkboxs__title">
                                <FormControlLabel
                                    control={<Checkbox icon={<img src={UncheckIcon} alt="" />} checkedIcon={<img src={CheckedIcon} alt="" />} className={` custom-checkbox`} />}
                                    label={permission.functionName}
                                />
                                <CustomButton
                                    text=""
                                    backgroundColor="transparent"
                                    backgroundColorHover="transparent"
                                    boxShadow="none"
                                    width={25}
                                    height={25}
                                    icon={isItemOpen(`${permission.functionId}`) ? CollapseBlueIcon : CollapseBlackIcon}
                                    onClick={() => handleToggle(`${permission.functionId}`)}
                                    className="btn-collapse"
                                />
                            </Box>
                            <Collapse in={isItemOpen(`${permission.functionId}`)} timeout="auto" unmountOnExit data-id={`${permission.functionId}`} className="list-collapse">
                                <List component="div" disablePadding className="list-permission">
                                    {permission.roleFunctionClaims.map((subPermission, subIndex) => {
                                        return (
                                            <ListItem key={subPermission.actionId} className="list-permission__items">
                                                <ListItemIcon className="list-permission__items__item">
                                                    {/* <Checkbox icon={<img src={UncheckIcon} alt="" />} checkedIcon={<img src={CheckedIcon} alt="" />} className="custom-checkbox" /> */}
                                                    <Controller
                                                        name={`functions[${indx}].roleFunctionClaims[${subIndex}].value` as any}
                                                        control={control}
                                                        defaultValue={subPermission.value}
                                                        render={({ field }) => (
                                                            <Checkbox {...field} icon={<img src={UncheckIcon} alt="" />} checkedIcon={<img src={CheckedIcon} alt="" />} className="custom-checkbox" />
                                                        )}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary={subPermission.claimName} title={subPermission.claimName || ''} className="list-permission__items__text" />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </Box>
            </div>
        </form>
    );
};

export default AddRolePage;
