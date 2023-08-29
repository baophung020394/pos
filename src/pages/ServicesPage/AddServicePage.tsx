import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import TextareaPolicy from '@components/TextareaFieldsPolicy';
import { Role, RoleRequest, RoleResponse, RoleResponseAdd } from '@models/role';
import { Box, Checkbox, Collapse, FormControlLabel, Input, List, ListItem, ListItemIcon, ListItemText, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { showErrorToast, showSuccessToast } from '@store/actions/actionToast';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '@assets/images/service/close.svg';
import SaveIcon from '@assets/images/customer/save.svg';
import CheckedIcon from '@assets/images/customer/checkboxicon.svg';
import UncheckIcon from '@assets/images/customer/uncheckbox.svg';
import CollapseBlackIcon from '@assets/images/branch/collapse-black.svg';
import CollapseBlueIcon from '@assets/images/branch/collapse-blue.svg';
import ArrowRightIcon from '@assets/images/service/arrow-right.svg';
import AddMoreIcon from '@assets/images/service/addmore.svg';
import IP1 from '@assets/images/service/ip1.png';
import './formservicepage.scss';
import useApi from '@hooks/useApi';
import { useNavigate } from 'react-router-dom';
import ImageCustom from '@components/Image';
import SelectCustomAdvance from '@components/SelectCustomAdvance';

interface AddServicePageProps {
    onClose?: () => void;
}
const AddServicePage: React.FC<AddServicePageProps> = ({ onClose }) => {
    const [permissionsList, setPermissionsList] = useState<RoleResponseAdd>();
    const { handleSubmit, control } = useForm<any>();
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
        <form className="form-add-service" onSubmit={handleSubmit(onSubmit)}>
            <Box className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm mới dịch vụ
                </Typography>
                <Box className="heading--option">
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
                </Box>
            </Box>

            <Box className="main">
                <Box className="main__content">
                    <Box className="main__card">
                        <Box className="main__heading">
                            <Typography variant="h3" component="h3">
                                Thông tin chung
                            </Typography>
                        </Box>

                        <Box className="main__form">
                            <Box className="main__form--control">
                                <label>Tên dịch vụ</label>
                                <Controller name="roleName" control={control} render={({ field }) => <Input type="text" className="input-field" placeholder="Nhập tên dịch vụ" {...field} />} />
                            </Box>
                            <Box className="main__form--control">
                                <label>Mã dịch vụ/SKU</label>
                                <Controller
                                    name="roleName"
                                    control={control}
                                    render={({ field }) => <Input type="text" className="input-field input-field--half" placeholder="Nhập tên dịch vụ" {...field} />}
                                />
                            </Box>

                            <Typography component="p" className="des">
                                Mô tả dịch vụ <ImageCustom alt="" src={ArrowRightIcon} className="icon-arrorw" />
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="main__card">
                        <Box className="main__heading">
                            <Typography variant="h3" component="h3">
                                Ảnh sản phẩm
                            </Typography>
                            <Typography component="span">Xoá tất cả</Typography>
                        </Box>

                        <Box className="main__form"></Box>
                    </Box>
                    <Box className="main__card">
                        <Box className="main__heading">
                            <Typography variant="h3" component="h3">
                                Linh kiện thành phần <Switch color="primary" className="switch-button" />
                            </Typography>
                            <Typography component="span">
                                <ImageCustom src={AddMoreIcon} alt="" className="add-more" /> Thêm linh kiện
                            </Typography>
                        </Box>

                        <Box className="main__form">
                            <Typography component="p" className="des2">
                                Nhập linh kiện thành phần cần để làm dịch vụ và tính giá vốn
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Box className="table-head">
                                                <Typography component="p">Ảnh</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-head">
                                                <Typography component="p">Tên linh kiện</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-head">
                                                <Typography component="p">Số lượng</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-head">
                                                <Typography component="p">Đơn giá</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-head">
                                                <Typography component="p">Thành tiền</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Box className="table-body">
                                                <ImageCustom src={IP1} alt="" className="col__image" />
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-body">
                                                <Typography>Kính iPhone 14 Pro Max</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-body">
                                                <Typography>1</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-body">
                                                <Typography>80.000</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-body">
                                                <Typography>80.000</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-body">
                                                <ImageCustom src={CloseIcon} alt="" className="col__image" />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2} style={{ textAlign: 'right' }}>
                                            <Box className="table-body">
                                                <Typography>Tổng:</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            <Box className="table-body">
                                                <Typography></Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box className="table-body">
                                                <Typography>139,000</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </Box>
                <Box className="main__sidebar">
                    <Box className="main__card">
                        <Box className="main__heading">
                            <Typography variant="h3" component="h3">
                                Thông tin bổ sung
                            </Typography>
                        </Box>
                        <Box className="main__content">
                            <Box className="main__form">
                                <Box className="main__form--control">
                                    <label>Danh mục dịch vụ</label>
                                    <SelectCustomAdvance
                                        options={[{ label: '', value: '' }]}
                                        onSelect={(selectedOption: any) => {
                                            // setValue('customerGroupName', selectedOption.value);
                                        }}
                                        placeholder="Chọn danh mục dịch vụ"
                                    />
                                </Box>
                                <Box className="main__form--control">
                                    <label>Danh mục liên quan</label>
                                    <SelectCustomAdvance
                                        options={[{ label: '', value: '' }]}
                                        onSelect={(selectedOption: any) => {
                                            // setValue('customerGroupName', selectedOption.value);
                                        }}
                                        placeholder="Chọn danh mục liên quan"
                                    />
                                </Box>
                                <Box className="main__form--control">
                                    <label>Tag</label>
                                    <Controller
                                        name="roleName"
                                        control={control}
                                        render={({ field }) => <textarea rows={4} className="input-field input-field--textarea" placeholder="Nhập tên dịch vụ" {...field} />}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="main__card">
                        <Box className="main__heading">
                            <Typography variant="h3" component="h3">
                                Cài đặt nâng cao
                            </Typography>
                        </Box>
                        <Box className="main__content">
                            <Box className="main__form">
                                <Box className="main__form--between">
                                    <Box className="main__form--title">
                                        <Typography component="p">Trạng thái</Typography>
                                        <Typography component="span">Đang giao dịch</Typography>
                                    </Box>
                                    <Box className="main__form--switch">
                                        <Switch color="primary" className="switch-button" />
                                    </Box>
                                </Box>
                                <Box className="main__form--control">
                                    <label>Bảo hành</label>
                                    <SelectCustomAdvance
                                        options={[{ label: '', value: '' }]}
                                        onSelect={(selectedOption: any) => {
                                            // setValue('customerGroupName', selectedOption.value);
                                        }}
                                        placeholder="Chọn bảo hành"
                                    />
                                </Box>
                                <Box className="main__form--control">
                                    <label>Hoa hồng nhân viên</label>
                                    <SelectCustomAdvance
                                        options={[{ label: '', value: '' }]}
                                        onSelect={(selectedOption: any) => {
                                            // setValue('customerGroupName', selectedOption.value);
                                        }}
                                        placeholder="Chọn chính sách hoa hồng"
                                    />
                                </Box>
                                <Box className="main__form--control">
                                    <label>Mẫu báo giá</label>
                                    <SelectCustomAdvance
                                        options={[{ label: '', value: '' }]}
                                        onSelect={(selectedOption: any) => {
                                            // setValue('customerGroupName', selectedOption.value);
                                        }}
                                        placeholder="Chọn mẫu báo giá"
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default AddServicePage;
