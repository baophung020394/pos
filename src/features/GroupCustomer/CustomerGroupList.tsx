import CustomButton from '@components/Button';
import ModelCustom from '@components/ModelCustom';
import FormAddCustomer from '@features/forms/customer/FormAddCustomer';
import useApi from '@hooks/useApi';
import { Box, Checkbox, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { setCurrentCus } from '@store/customerSlice';
import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Customer, CustomerGroup, CustomerGroupResponse } from 'src/models/customer';
import CheckedIcon from '../../assets/images/customer/checkboxicon.svg';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import FirstPageIcon from '../../assets/images/customer/firstpage.svg';
import LastPageIcon from '../../assets/images/customer/lastpage.svg';
import NextIcon from '../../assets/images/customer/next.svg';
import PrevIcon from '../../assets/images/customer/prev.svg';
import SettingColIcon from '../../assets/images/customer/setting-col.svg';
import SortIcon from '../../assets/images/customer/sort.svg';
import UncheckIcon from '../../assets/images/customer/uncheckbox.svg';
import AddIcon from '../../assets/images/customer/add.svg';
import './customer-group.scss';
import FormAddCusGroup from '@features/forms/customerGroup/FormAddCusGroup';

const columns: { field: keyof CustomerGroup; label: string }[] = [
    // { field: 'customerId', label: 'Mã khách hàng' },
    { field: 'customerGroupCode', label: 'Mã nhóm' },
    { field: 'customerGroupName', label: 'Tên nhóm' },
    { field: 'discription', label: 'Mô tả' },
    { field: 'pricePolicyName', label: 'Chính sách giá' },
    { field: 'totalCustomer', label: 'Số lượng khách hàng' },
];

const pageSizeOptions = [20, 50, 100, 200, 500];

const CustomerGroupList: React.FC = () => {
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof CustomerGroup>>(['customerGroupCode', 'customerGroupName', 'discription', 'pricePolicyName', 'totalCustomer']);
    const [selectAll, setSelectAll] = useState(false); // Trạng thái chọn tất cả
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [isOpenAddCusGroup, setIsOpenAddCusGroup] = useState<boolean>(false);
    const apiUrl = '/api/CustomerGroup/list'; // Đường dẫn cụ thể đến API
    const { data, loading, error } = useApi<CustomerGroupResponse>(apiUrl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenAddCusGroup = () => setIsOpenAddCusGroup(true);
    const handleCloseAddCusGroup = () => setIsOpenAddCusGroup(false);

    const handleColumnToggle = (field: keyof CustomerGroup) => {
        if (visibleColumns.includes(field)) {
            setVisibleColumns(visibleColumns.filter((col) => col !== field));
        } else {
            setVisibleColumns([...visibleColumns, field]);
        }
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        setSelectedRows(selectAll ? [] : visibleCustomers.map((customer) => customer.customerGroupId));
    };

    const handleSelectRow = (customerId: string) => {
        if (selectedRows.includes(customerId)) {
            setSelectedRows(selectedRows.filter((row) => row !== customerId));
        } else {
            setSelectedRows([...selectedRows, customerId]);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newSize = event.target.value as number;
        setPageSize(newSize);
        setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số lượng item trên 1 trang
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleColumnReorder = (result: any) => {
        if (!result.destination) {
            return;
        }
        const updatedVisibleColumns = Array.from(visibleColumns);
        const [movedColumn] = updatedVisibleColumns.splice(result.source.index, 1);
        updatedVisibleColumns.splice(result.destination.index, 0, movedColumn);
        setVisibleColumns(updatedVisibleColumns);
    };

    const handleSearch = (value: string) => {
        setValueSearch(value);
    };

    const handleGoPageDetail = (customer: Customer, column: string) => {
        if (column === 'customerName') {
            navigate(`/customers/${customer['customerId']}`);
            dispatch(setCurrentCus(customer));
        }
    };

    // Tính toán dữ liệu hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = data ? Math.min(startIndex + pageSize, data.data.length) : 0;
    const visibleCustomers = data ? data.data : [];
    const lastPage = data ? Math.ceil(data.data.length / pageSize) : 0;

    return (
        <div className="customer-group-page__list">
            <Box className="btn-add">
                <CustomButton
                    text="Thêm nhóm khách hàng"
                    maxHeight={45}
                    minHeight={32}
                    minWidth={32}
                    backgroundColor="#007AFF"
                    backgroundColorHover="#007AFF"
                    borderRadius="50%"
                    icon={AddIcon}
                    className="btn-add-cus"
                    onClick={handleOpenAddCusGroup}
                />
            </Box>

            <ModelCustom
                isOpen={isOpenAddCusGroup}
                onClose={handleCloseAddCusGroup}
                title=""
                okButtonText=""
                cancelButtonText=""
                onCancel={handleCloseAddCusGroup}
                className="customer-page__list__modal"
            >
                <FormAddCusGroup onClose={handleCloseAddCusGroup} />
            </ModelCustom>
            <DragDropContext onDragEnd={handleColumnReorder}>
                <div className="customer-group-page__list__tables">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {visibleColumns.map((column) => (
                                        <TableCell key={column}>
                                            <div className="table-head">
                                                <Typography className="p">{columns.find((col) => col.field === column)?.label}</Typography>
                                                <button>
                                                    <img src={SortIcon} alt="" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visibleCustomers.map((customer) => (
                                    <TableRow key={customer.customerGroupId}>
                                        {visibleColumns.map((column) => {
                                            return <TableCell key={column}>{customer[column]}</TableCell>;
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </DragDropContext>

            <div className="customer-group-page__list__pagination">
                <div className="customer-group-page__list__pagination__select">
                    <p>
                        Hiển thị 1 - {data?.data.length} của {data?.data.length}
                    </p>
                    <Select
                        className="select-option"
                        value={pageSize}
                        onChange={(event) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            handlePageSizeChange(event as any);
                        }}
                        IconComponent={() => {
                            return (
                                <>
                                    <img src={DropdownIcon} alt="" />
                                </>
                            );
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </div>

                {data?.success ? (
                    <div className="customer-group-page__list__pagination__number">
                        <CustomButton
                            text=""
                            maxHeight={40}
                            maxWidth={40}
                            minHeight={40}
                            minWidth={40}
                            backgroundColor="transparent"
                            backgroundColorHover="transparent"
                            borderRadius="50%"
                            icon={FirstPageIcon}
                            className="btn-first"
                            onClick={() => setCurrentPage(1)}
                        />
                        <Pagination
                            count={Math.ceil(data?.data.length / pageSize)}
                            page={currentPage}
                            onChange={handlePageChange}
                            className="pagination-list"
                            renderItem={(item) => {
                                const isPrevious = item.type === 'previous';
                                const isNext = item.type === 'next';
                                const iconClassName = isPrevious ? PrevIcon : isNext ? NextIcon : '';

                                return <PaginationItem {...item} className={iconClassName} />;
                            }}
                        />
                        <CustomButton
                            text=""
                            maxHeight={40}
                            maxWidth={40}
                            minHeight={40}
                            minWidth={40}
                            backgroundColor="transparent"
                            backgroundColorHover="transparent"
                            borderRadius="50%"
                            icon={LastPageIcon}
                            className="btn-last"
                            onClick={() => setCurrentPage(lastPage)}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default React.memo(CustomerGroupList);
