import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import InputFieldsCusGroup from '@components/InputFieldsCusGroup';
import SelectCustomPolicy from '@components/SelectCustomPolicy';
import TextareaCusGroup from '@components/TextareaCusGroup';
import useApi from '@hooks/useApi';
import { CustomerGroup, CustomerGroupReq } from '@models/customer';
import { Typography } from '@mui/material';
import { showSuccessToast } from '@store/actions/actionToast';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '@assets/images/customer/close.svg';
import DropdownIcon from '@assets/images/customer/dropdown.svg';
import SaveIcon from '@assets/images/customer/save.svg';
import Select from 'react-select';
import './formaddcusgroup.scss';

interface FormAddCusGroupProps {
    onClose: () => void;
    onAddSuccess: (branch: CustomerGroup) => void;
}
interface Options {
    value: string;
    label: string;
}
const FormAddCusGroup: React.FC<FormAddCusGroupProps> = ({ onClose, onAddSuccess }) => {
    const { handleSubmit, control, setValue } = useForm<CustomerGroupReq>();
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<Options[]>([]);
    const dataPricePolicy = useApi<any>('/api/PricePolicy/list');

    const onSubmit = async (data: CustomerGroupReq) => {
        setLoading(true);
        const url = '/api/CustomerGroup/add';
        const response: any = await axiosClient.post(url, data);
        console.log('response', response);
        if (response?.data.success) {
            onClose();
            setLoading(false);
            onAddSuccess(response?.data.data);
            showSuccessToast('Thêm mới nhóm khách hàng thành công');
        }
    };

    useEffect(() => {
        if (dataPricePolicy.data?.success) {
            const formattedOptions = dataPricePolicy.data?.data.reduce((accumulator: any, current: any) => {
                const option = {
                    value: current.pricePolicyId,
                    label: current.pricePolicyName,
                };
                accumulator.push(option);
                return accumulator;
            }, []);
            setOptions(formattedOptions);
        }
    }, [dataPricePolicy.data?.success]);

    return (
        <form className="form-add-customer-group" onSubmit={handleSubmit(onSubmit)}>
            <div className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm nhóm khách hàng
                </Typography>
                <div className="heading--option">
                    <CustomButton text="" backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" icon={CloseIcon} className="btn-close" onClick={onClose} />
                </div>
            </div>

            <div className="information">
                <div className="information--col">
                    <div className="information--form-control">
                        <label>Tên nhóm khách hàng</label>
                        <InputFieldsCusGroup name="CustomerGroupName" label="" control={control} placeholder="Nhập tên nhóm khách hàng" />
                    </div>
                </div>

                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Mã nhóm khách hàng</label>
                        <InputFieldsCusGroup name="CustomerGroupCode" label="" control={control} placeholder="Nhập mã chi nhánh" />
                    </div>
                    <div className="information--form-control">
                        <label>Chính sách giá</label>
                        <Select
                            options={options}
                            isSearchable={true}
                            defaultValue={[{ value: '', label: 'Chọn chính sách giá' }]}
                            name="PricePolicyName"
                            onChange={(selectedOption: any) => {
                                setValue('PricePolicyName', selectedOption.value);
                            }}
                        />
                        {/* <SelectCustomPolicy name="PricePolicyName" label="" control={control} endpoint="/api/PricePolicy/list" endIcon={DropdownIcon} /> */}
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control discount">
                        <label>Chiết khấu %</label>
                        <InputFieldsCusGroup name="Discount" label="" control={control} placeholder="0" type="number" />
                    </div>
                </div>

                <div className="information--col">
                    <div className="information--form-control textarea">
                        <label>Mô tả</label>
                        <TextareaCusGroup name="Note" label="" control={control} rows={2} placeholder="Nhập mô tả" />
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

export default FormAddCusGroup;
