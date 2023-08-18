import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import InputFieldsPolicy from '@components/InputFieldsPolicy';
import TextareaPolicy from '@components/TextareaFieldsPolicy';
import { PolicyRequest } from '@models/policy';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '../../../assets/images/customer/close.svg';
import SaveIcon from '../../../assets/images/customer/save.svg';
import './formaddpolicy.scss';

interface FormAddPolicyProps {
    onClose: () => void;
}
const FormAddPolicy: React.FC<FormAddPolicyProps> = ({ onClose }) => {
    const { handleSubmit, control, formState } = useForm<PolicyRequest>();
    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit = async (data: PolicyRequest) => {
        if (!formState.isValid) {
            // Form không hợp lệ, không thực hiện submit
            return;
        }

        setLoading(true);
        const url = '/api/PricePolicy/save';
        const response: any = await axiosClient.post(url, null, { params: data });
        console.log('response', response);
        if (response?.data.success) {
            onClose();
            setLoading(false);
        }
    };

    return (
        <form className="form-add-customer" onSubmit={handleSubmit(onSubmit)}>
            <div className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm mới chính sách
                </Typography>
                <div className="heading--option">
                    <CustomButton text="" backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" icon={CloseIcon} className="btn-close" onClick={onClose} />
                </div>
            </div>

            <div className="information">
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Tên chính sách</label>
                        <InputFieldsPolicy name="pricePolicyName" label="" control={control} placeholder="Nhập tên chính sách giá" />
                    </div>
                    <div className="information--form-control">
                        <label>Mã</label>
                        <InputFieldsPolicy name="PricePolicyNameCode" label="" control={control} placeholder="Nhập mã" />
                    </div>
                </div>

                <div className="information--col">
                    <div className="information--form-control textarea">
                        <label>Mô tả</label>
                        <TextareaPolicy name="Note" label="" control={control} rows={2} placeholder="Nhập mô tả" />
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

export default FormAddPolicy;
