import CustomButton from '@components/Button';
import { Box, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '../../assets/images/customer/add.svg';
import Search from '@components/Search';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import LazyImage from '@components/Image';

const FilterCustomer: React.FC = () => {
    return (
        <div className="customer-page__list__filters">
            <div className="filters--filter-top">
                <CustomButton
                    text="Thêm khách hàng mới"
                    maxHeight={45}
                    minHeight={32}
                    minWidth={32}
                    backgroundColor="#007AFF"
                    backgroundColorHover="#007AFF"
                    borderRadius="50%"
                    icon={AddIcon}
                    className="btn-add-cus"
                />
            </div>
            <div className="filters--filter-bottom">
                <Search placeholder="Tìm kiếm theo mã khách hàng, tên khách hàng và số điện thoại" />
                <div className="filters--filter-bottom__options">
                    <div className="option">
                        <Typography component="p">Nhóm KH</Typography>
                        <LazyImage src={DropdownIcon} alt="" />
                    </div>
                    <div className="option">
                        <Typography component="p">Trạng thái</Typography>
                        <LazyImage src={DropdownIcon} alt="" />
                    </div>
                    <div className="option">
                        <Typography component="p">Ngay tạo</Typography>
                        <LazyImage src={DropdownIcon} alt="" />
                    </div>
                    <div className="option">
                        <Typography component="p">Bộ lọc khác</Typography>
                        <LazyImage src={DropdownIcon} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCustomer;
