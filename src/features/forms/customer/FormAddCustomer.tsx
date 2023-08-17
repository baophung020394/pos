import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import Input from '@components/InputFields';
import SelectCustom from '@components/SelectCustom';
import SelectCustomCity from '@components/SelectCustomCity';
import SelectCustomDistrict from '@components/SelectCustomDistrict';
import SelectFields from '@components/SelectFields';
import TextareaFields from '@components/TextareaFields';
import useApi from '@hooks/useApi';
import { CustomerReq, CustomerResponse } from '@models/customer';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '../../../assets/images/customer/close.svg';
import DropdownIcon from '../../../assets/images/customer/dropdown.svg';
import SaveIcon from '../../../assets/images/customer/save.svg';
import './formaddcustomer.scss';

interface FormAddCustomerProps {
    handleCloseAddCus: () => void;
}
const FormAddCustomer: React.FC<FormAddCustomerProps> = ({ handleCloseAddCus }) => {
    const { handleSubmit, control, setValue } = useForm<CustomerReq>();

    const onSubmit = async (data: CustomerReq) => {
        // if (!data) return;
        console.log('data');
        const url = '/api/Customer/save';
        const response: any = await axiosClient.post(url, null, { params: data });
        console.log('response', response);
        if (response?.data.success) {
            handleCloseAddCus();
        }
        // const postData = useApi<CustomerReq>(url, 'post', data);
    };

    const handleDateChange = (event: any) => {
        setValue('BirthDay', event.target.value);
    };

    return (
        <form className="form-add-customer" onSubmit={handleSubmit(onSubmit)}>
            <Box className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm mới khách hàng
                </Typography>
                <Box className="heading--option">
                    <CustomButton text="Lưu" backgroundColor="#007AFF" backgroundColorHover="#007AFF" boxShadow="none" icon={SaveIcon} className="btn-submit" type="submit" />
                    <CustomButton text="" backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" icon={CloseIcon} className="btn-close" />
                </Box>
            </Box>

            <Box className="information">
                <Typography component="h3" variant="h3">
                    Thông tin chung
                </Typography>
                <Box className="information--col">
                    <Box className="information--form-control">
                        <label>Tên khách hàng</label>
                        <Input<CustomerReq> name="CustomerName" label="" control={control} />
                    </Box>
                </Box>
                <Box className="information--cols">
                    <Box className="information--form-control">
                        <label>Số điện thoại</label>
                        <Input<CustomerReq> name="PhoneNumber" label="" control={control} />
                    </Box>
                    <Box className="information--form-control">
                        <label>Nhóm khách hàng</label>
                        <SelectCustom name="CustomerGroupName" label="" control={control} endpoint="/api/CustomerGroup/list" endIcon={DropdownIcon} />
                    </Box>
                </Box>
                <Box className="information--cols">
                    <Box className="information--form-control">
                        <label>Mã khách hàng</label>
                        <Input<CustomerReq> name="CustomerCode" label="" control={control} />
                    </Box>
                    <Box className="information--form-control">
                        <label>Email</label>
                        <Input<CustomerReq> name="email" label="" control={control} />
                    </Box>
                </Box>
                <Box className="information--cols">
                    <Box className="information--form-control">
                        <label>Tỉnh/Thành Phố</label>
                        <SelectCustomCity name="AreaCityId" label="" control={control} endpoint="/api/Area/cities" endIcon={DropdownIcon} />
                    </Box>
                    <Box className="information--form-control">
                        <label>Phường xã</label>
                        <SelectCustomDistrict name="AreaDistrictId" label="" control={control} endpoint="/api/Area/district/list" endIcon={DropdownIcon} />
                    </Box>
                </Box>
                <Box className="information--col">
                    <Box className="information--form-control textarea">
                        <label>Địa chỉ cụ thể</label>
                        <TextareaFields<CustomerReq> name="Address" label="" control={control} rows={2} />
                    </Box>
                </Box>
            </Box>

            <Box className="information-add">
                <Typography component="h3" variant="h3">
                    Thông tin bổ sung
                </Typography>

                <Box className="information-add--columns">
                    <Box className="information-add__left">
                        <Box className="information-add--cols">
                            <Box className="information--form-control">
                                <label>Giới tính</label>
                                <SelectFields<CustomerReq> name="Gender" label="" control={control} endIcon={DropdownIcon} options={['Nam', 'Nữ', 'Khác']} />
                            </Box>
                            <Box className="information--form-control">
                                <label>Ngày sinh</label>
                                <input type="date" className="input-date" onChange={handleDateChange} />
                            </Box>
                        </Box>
                        <Box className="information-add--cols">
                            <Box className="information--form-control">
                                <label>Mã số thuế</label>
                                <Input<CustomerReq> name="TaxCode" label="" control={control} />
                            </Box>
                            <Box className="information--form-control">
                                <label>Công nợ</label>
                                <Input<CustomerReq> name="Debt" label="" control={control} />
                            </Box>
                        </Box>
                    </Box>
                    <Box className="information-add__right">
                        <Box className="information--form-control textarea-note">
                            <label>Ghi chú</label>
                            <TextareaFields<CustomerReq> name="Note" label="" control={control} rows={4} />
                        </Box>
                        <Box className="information--form-control">
                            <label>Tag</label>
                            <Input<CustomerReq> name="Hastag" label="" control={control} />
                        </Box>
                        <Box className="information--form-control">
                            <label>Facebook</label>
                            <Input<CustomerReq> name="FacebookLink" label="" control={control} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default FormAddCustomer;
