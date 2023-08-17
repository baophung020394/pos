import CustomButton from '@components/Button';
import LazyImage from '@components/Image';
import Search from '@components/Search';
import { Typography } from '@mui/material';
import React from 'react';
import AddIcon from '../../assets/images/customer/add.svg';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import ImportIcon from '../../assets/images/customer/import.svg';
import ExportIcon from '../../assets/images/customer/export.svg';

type FilterCustomerProps = {
    getValueSearch?: (value: string) => void;
    onClick?: (value: boolean) => void;
};

const FilterCustomer: React.FC<FilterCustomerProps> = ({ onClick, getValueSearch }) => {
    const onSearch = (value: string) => {
        if (!getValueSearch) return;
        getValueSearch(value);
    };
    const handleOnClickAddCus = () => {
        if (!onClick) return;
        onClick(true);
    };

    return (
        <div className="customer-page__list__filters">
            <div className="filters--filter-top">
                <CustomButton
                    text="Thêm khách hàng"
                    maxHeight={45}
                    minHeight={32}
                    minWidth={32}
                    backgroundColor="#007AFF"
                    backgroundColorHover="#007AFF"
                    borderRadius="50%"
                    icon={AddIcon}
                    className="btn-add-cus"
                    onClick={handleOnClickAddCus}
                />
                <Search placeholder="Tìm kiếm theo mã khách hàng, tên khách hàng và số điện thoại" onSearch={onSearch} />
            </div>
            <div className="filters--filter-bottom">
                <div className="filters--filter-bottom__files">
                    <div className="file">
                        <Typography component="p">Nhập file</Typography>
                        <LazyImage src={ImportIcon} alt="" />
                    </div>
                    <div className="file">
                        <Typography component="p">Xuất file</Typography>
                        <LazyImage src={ExportIcon} alt="" />
                    </div>
                </div>
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
