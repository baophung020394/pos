import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import Input from '@components/InputFields';
import SelectCustom from '@components/SelectCustom';
import SelectCustomCity from '@components/SelectCustomCity';
import SelectCustomDistrict from '@components/SelectCustomDistrict';
import SelectFields from '@components/SelectFields';
import TextareaFields from '@components/TextareaFields';
import { CustomerReq } from '@models/customer';
import { Typography } from '@mui/material';
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
            <div className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm mới khách hàng
                </Typography>
                <div className="heading--option">
                    <CustomButton text="Lưu" backgroundColor="#007AFF" backgroundColorHover="#007AFF" boxShadow="none" icon={SaveIcon} className="btn-submit" type="submit" />
                    <CustomButton text="" backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" icon={CloseIcon} className="btn-close" />
                </div>
            </div>

            <div className="information">
                <Typography component="h3" variant="h3">
                    Thông tin chung
                </Typography>
                <div className="information--col">
                    <div className="information--form-control">
                        <label>Tên khách hàng</label>
                        <Input<CustomerReq> name="CustomerName" label="" control={control} />
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Số điện thoại</label>
                        <Input<CustomerReq> name="PhoneNumber" label="" control={control} />
                    </div>
                    <div className="information--form-control">
                        <label>Nhóm khách hàng</label>
                        <SelectCustom name="CustomerGroupName" label="" control={control} endpoint="/api/CustomerGroup/list" endIcon={DropdownIcon} />
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Mã khách hàng</label>
                        <Input<CustomerReq> name="CustomerCode" label="" control={control} />
                    </div>
                    <div className="information--form-control">
                        <label>Email</label>
                        <Input<CustomerReq> name="email" label="" control={control} />
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Tỉnh/Thành Phố</label>
                        <SelectCustomCity name="AreaCityId" label="" control={control} endpoint="/api/Area/cities" endIcon={DropdownIcon} />
                    </div>
                    <div className="information--form-control">
                        <label>Phường xã</label>
                        <SelectCustomDistrict name="AreaDistrictId" label="" control={control} endpoint="/api/Area/district/list" endIcon={DropdownIcon} />
                    </div>
                </div>
                <div className="information--col">
                    <div className="information--form-control textarea">
                        <label>Địa chỉ cụ thể</label>
                        <TextareaFields<CustomerReq> name="Address" label="" control={control} rows={2} />
                    </div>
                </div>
            </div>

            <div className="information-add">
                <Typography component="h3" variant="h3">
                    Thông tin bổ sung
                </Typography>

                <div className="information-add--columns">
                    <div className="information-add__left">
                        <div className="information-add--cols">
                            <div className="information--form-control">
                                <label>Giới tính</label>
                                <SelectFields<CustomerReq> name="Gender" label="" control={control} endIcon={DropdownIcon} options={['Nam', 'Nữ', 'Khác']} />
                            </div>
                            <div className="information--form-control">
                                <label>Ngày sinh</label>
                                <input type="date" className="input-date" onChange={handleDateChange} />
                            </div>
                        </div>
                        <div className="information-add--cols">
                            <div className="information--form-control">
                                <label>Mã số thuế</label>
                                <Input<CustomerReq> name="TaxCode" label="" control={control} />
                            </div>
                            <div className="information--form-control">
                                <label>Công nợ</label>
                                <Input<CustomerReq> name="Debt" label="" control={control} />
                            </div>
                        </div>
                    </div>
                    <div className="information-add__right">
                        <div className="information--form-control textarea-note">
                            <label>Ghi chú</label>
                            <TextareaFields<CustomerReq> name="Note" label="" control={control} rows={4} />
                        </div>
                        <div className="information--form-control">
                            <label>Tag</label>
                            <Input<CustomerReq> name="Hastag" label="" control={control} />
                        </div>
                        <div className="information--form-control">
                            <label>Facebook</label>
                            <Input<CustomerReq> name="FacebookLink" label="" control={control} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormAddCustomer;
