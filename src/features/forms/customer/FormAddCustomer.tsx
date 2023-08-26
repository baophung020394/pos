import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import Input from '@components/InputFields';
import SelectCustom from '@components/SelectCustom';
import SelectCustomCity from '@components/SelectCustomCity';
import SelectCustomDistrict from '@components/SelectCustomDistrict';
import SelectFields from '@components/SelectFields';
import TextareaFields from '@components/TextareaFields';
import useApi from '@hooks/useApi';
import { Customer, CustomerReq } from '@models/customer';
import { Typography } from '@mui/material';
import { showSuccessToast } from '@store/actions/actionToast';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '@assets/images/customer/close.svg';
import DropdownIcon from '@assets/images/customer/dropdown.svg';
import SaveIcon from '@assets/images/customer/save.svg';
import SelectCityMultiple from '@components/SelectCityMultiple';
import Select from 'react-select';
import './formaddcustomer.scss';
import axios from 'axios';

interface FormAddCustomerProps {
    handleCloseAddCus: () => void;
    onAddSuccess: (branch: Customer) => void;
}

interface Options {
    value: string;
    label: string;
}
const FormAddCustomer: React.FC<FormAddCustomerProps> = ({ onAddSuccess, handleCloseAddCus }) => {
    const { handleSubmit, control, setValue, formState } = useForm<CustomerReq>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenCity, setIsOpenCity] = useState<boolean>(false);
    const [options, setOptions] = useState<Options[]>([]);
    const [optionsDistrict, setOptionsDistrict] = useState<Options[]>([]);
    const [optionsCusGroups, setOptionsCusGroups] = useState<Options[]>([]);
    const dataCity = useApi<any>('/api/Area/cities');
    const dataCusGroup = useApi<any>('/api/CustomerGroup/list');

    console.log('dataCity', dataCity);
    const handleOpenCity = () => setIsOpenCity(true);
    const handleCloseCity = () => {
        setIsOpenCity(false);
        console.log('onClose is called');
    };
    const onSubmit = async (data: CustomerReq) => {
        setLoading(true);
        const url = '/api/Customer/add';
        const response: any = await axiosClient.post(url, data);
        console.log('response', response);
        if (response?.data.success) {
            // handleCloseAddCus();
            setLoading(false);
            onAddSuccess(response?.data.data);
            showSuccessToast('Thay đổi thành công');
        }
    };

    const handleDateChange = (event: any) => {
        setValue('birthDay', event.target.value);
    };

    const handleOptionChangeCity = async (selectedOption: any) => {
        if (selectedOption) {
            console.log(selectedOption);
            setValue('areaCityId', selectedOption.value);
            const dataDistrict = await axiosClient.get(`/api/Area/district/${selectedOption.value}`);
            console.log(dataDistrict);
            if (dataDistrict) {
                const formattedOptions = dataDistrict.data?.data.reduce((accumulator: any, current: any) => {
                    const option = {
                        value: current.districtId,
                        label: current.districtName,
                    };
                    accumulator.push(option);
                    return accumulator;
                }, []);
                setOptionsDistrict(formattedOptions);
            }
        }
    };

    useEffect(() => {
        if (dataCity.data?.success) {
            const formattedOptions = dataCity.data?.data.reduce((accumulator: any, current: any) => {
                const option = {
                    value: current.cityId,
                    label: current.cityName,
                };
                accumulator.push(option);
                return accumulator;
            }, []);
            setOptions(formattedOptions);
        }
    }, [dataCity.data?.success]);

    useEffect(() => {
        if (dataCusGroup.data?.success) {
            const formattedOptions = dataCusGroup.data?.data.reduce((accumulator: any, current: any) => {
                const option = {
                    value: current.customerGroupId,
                    label: current.customerGroupName,
                };
                accumulator.push(option);
                return accumulator;
            }, []);
            setOptionsCusGroups(formattedOptions);
        }
    }, [dataCusGroup.data?.success]);

    return (
        <form className="form-add-customer" onSubmit={handleSubmit(onSubmit)}>
            <div className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm mới khách hàng
                </Typography>
                <div className="heading--option">
                    <CustomButton text="Lưu" backgroundColor="#007AFF" backgroundColorHover="#007AFF" boxShadow="none" icon={SaveIcon} className="btn-submit" type="submit" disabled={loading} />
                    <CustomButton text="" backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" icon={CloseIcon} className="btn-close" onClick={handleCloseAddCus} />
                </div>
            </div>

            <div className="information">
                <Typography component="h3" variant="h3">
                    Thông tin chung
                </Typography>
                <div className="information--col">
                    <div className="information--form-control">
                        <label>Tên khách hàng</label>
                        <Input name="customerName" label="" control={control} placeholder="Nhập tên khách hàng" />
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Số điện thoại</label>
                        <Input name="phoneNumber" label="" control={control} placeholder="Nhập số điện thoại" />
                    </div>
                    <div className="information--form-control">
                        <label>Nhóm khách hàng</label>
                        <Select
                            options={optionsCusGroups}
                            isSearchable={true}
                            defaultValue={[{ value: '', label: 'Chọn nhóm khách hàng' }]}
                            name="CustomerGroupName"
                            onChange={(selectedOption: any) => {
                                setValue('customerGroupName', selectedOption.value);
                            }}
                        />
                        {/* <SelectCustom name="CustomerGroupName" label="" control={control} endpoint="/api/CustomerGroup/list" endIcon={DropdownIcon} /> */}
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Mã khách hàng</label>
                        <Input name="customerCode" label="" control={control} placeholder="Nhập mã khách hàng" />
                    </div>
                    <div className="information--form-control">
                        <label>Email</label>
                        <Input name="email" label="" control={control} placeholder="Nhập địa chỉ Email" />
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Tỉnh/Thành Phố</label>
                        <Select options={options} isSearchable={true} defaultValue={[{ value: '', label: 'Chọn tỉnh/Thành Phố - Quận/Huyện' }]} name="AreaCityId" onChange={handleOptionChangeCity} />
                        {/* <SelectCustomCity name="AreaCityId" label="" control={control} endpoint="/api/Area/cities" endIcon={DropdownIcon} /> */}
                    </div>
                    <div className="information--form-control">
                        <label>Phường xã</label>
                        <Select
                            options={optionsDistrict}
                            isSearchable={true}
                            defaultValue={[{ value: '', label: 'Chọn Phường/Xã' }]}
                            name="AreaDistrictId"
                            onChange={(selectedOption: any) => {
                                setValue('areaDistrictId', selectedOption.value);
                            }}
                        />
                        {/* <SelectCustomDistrict name="AreaDistrictId" label="" control={control} endpoint="/api/Area/district/list" endIcon={DropdownIcon} /> */}
                    </div>
                </div>
                <div className="information--col">
                    <div className="information--form-control textarea">
                        <label>Địa chỉ cụ thể</label>
                        <TextareaFields name="address" label="" control={control} rows={2} placeholder="Nhập địa chỉ" />
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
                                <SelectFields name="gender" label="" control={control} endIcon={DropdownIcon} options={['Nam', 'Nữ', 'Khác']} />
                            </div>
                            <div className="information--form-control">
                                <label>Ngày sinh</label>
                                <input type="date" className="input-date" onChange={handleDateChange} placeholder="Chọn ngày sinh" />
                            </div>
                        </div>
                        <div className="information-add--cols">
                            <div className="information--form-control">
                                <label>Mã số thuế</label>
                                <Input name="taxCode" label="" control={control} placeholder="Mã số thuế" />
                            </div>
                            <div className="information--form-control">
                                <label>Công nợ</label>
                                <Input name="debt" label="" control={control} placeholder="Nhập công nợ đầu kỳ" />
                            </div>
                        </div>
                    </div>
                    <div className="information-add__right">
                        <div className="information--form-control textarea-note">
                            <label>Ghi chú</label>
                            <TextareaFields name="note" label="" control={control} rows={4} />
                        </div>
                        <div className="information--form-control">
                            <label>Tag</label>
                            <Input name="hastag" label="" control={control} placeholder='Nhập tag'/>
                        </div>
                        <div className="information--form-control">
                            <label>Facebook</label>
                            <Input name="facebookLink" label="" control={control} placeholder="Nhập link Facebook" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="loading-form">
                <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                    <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                </div>
            </div> */}
        </form>
    );
};

export default FormAddCustomer;
