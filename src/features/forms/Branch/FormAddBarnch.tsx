import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import InputFieldsBranch from '@components/InputFieldsBranch';
import InputFieldsPolicy from '@components/InputFieldsPolicy';
import SelectCustomCity from '@components/SelectCustomCity';
import TextareaPolicy from '@components/TextareaFieldsPolicy';
import { BranchRequest } from '@models/branch';
import { PolicyRequest } from '@models/policy';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '../../../assets/images/customer/close.svg';
import SaveIcon from '../../../assets/images/customer/save.svg';
import DropdownIcon from '../../../assets/images/customer/dropdown.svg';
import './formaddbranch.scss';
import SelectCityBranch from '@components/SelectCityBranch';
import SelectDistrictBranch from '@components/SelectDistrictBranch';
import CheckedIcon from '../../../assets/images/customer/checkboxicon.svg';
import UncheckIcon from '../../../assets/images/customer/uncheckbox.svg';

interface FormAddBranchProps {
    onClose: () => void;
}
const FormAddBranch: React.FC<FormAddBranchProps> = ({ onClose }) => {
    const { handleSubmit, control, formState } = useForm<BranchRequest>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: BranchRequest) => {
        setLoading(true);
        const url = '/api/Branch/save';
        const response: any = await axiosClient.post(url, null, { params: data });
        console.log('response', response);
        if (response?.data.success) {
            onClose();
            setLoading(false);
        }
    };

    return (
        <form className="form-add-branch" onSubmit={handleSubmit(onSubmit)}>
            <div className="heading heading--primary">
                <Typography component="h3" variant="h3">
                    Thêm chi nhánh
                </Typography>
                <div className="heading--option">
                    <CustomButton text="" backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" icon={CloseIcon} className="btn-close" onClick={onClose} />
                </div>
            </div>

            <div className="information">
                <div className="information--col">
                    <div className="information--form-control">
                        <label>Tên chi nhánh</label>
                        <InputFieldsBranch name="BranchName" label="" control={control} placeholder="Nhập tên chi nhánh" />
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Mã chi nhánh</label>
                        <InputFieldsBranch name="BranchCode" label="" control={control} placeholder="Nhập mã chi nhánh" />
                    </div>
                    <div className="information--form-control">
                        <label>Số điện thoại</label>
                        <InputFieldsBranch name="PhoneNumber" label="" control={control} placeholder="Nhập số điện thoại" />
                    </div>
                </div>

                <div className="information--col">
                    <div className="information--form-control">
                        <label>Địa chỉ chi tiết</label>
                        <InputFieldsBranch name="Address" label="" control={control} placeholder="Nhập địa chỉ chi tiết" />
                    </div>
                </div>

                <div className="information--cols">
                    <div className="information--form-control">
                        <label>Tỉnh/Thành Phố - Quận/Huyện</label>
                        <SelectCityBranch name="AreaCityId" label="" control={control} endpoint="/api/Area/cities" endIcon={DropdownIcon} />
                    </div>
                    <div className="information--form-control">
                        <label>Phường xã</label>
                        <SelectDistrictBranch name="AreaDistrictId" label="" control={control} endpoint="/api/Area/district/list" endIcon={DropdownIcon} />
                    </div>
                </div>
                <div className="information--cols">
                    <div className="information--form-control">
                        <Controller
                            name="Default"
                            control={control}
                            defaultValue={false} // Trạng thái mặc định của checkbox
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} icon={<img src={UncheckIcon} alt="" />} checkedIcon={<img src={CheckedIcon} alt="" />} className="custom-checkbox" />}
                                    label="Chi nhánh mặc định"
                                />
                            )}
                        />
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

export default FormAddBranch;
