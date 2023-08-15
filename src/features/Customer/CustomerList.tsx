import CustomButton from '@components/Button';
import FilterCustomer from '@features/Filters/FilterCustomer';
import { Checkbox, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { Customer } from 'src/models/customer';
import CheckedIcon from '../../assets/images/customer/checkboxicon.svg';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import FirstPageIcon from '../../assets/images/customer/firstpage.svg';
import LastPageIcon from '../../assets/images/customer/lastpage.svg';
import NextIcon from '../../assets/images/customer/next.svg';
import PrevIcon from '../../assets/images/customer/prev.svg';
import SettingColIcon from '../../assets/images/customer/setting-col.svg';
import SortIcon from '../../assets/images/customer/sort.svg';
import UncheckIcon from '../../assets/images/customer/uncheckbox.svg';
import ColumnConfig from './ColumnConfig';
import './customer.scss';

const columns: { field: keyof Customer; label: string }[] = [
    { field: 'customerId', label: 'Mã khách hàng' },
    { field: 'customerName', label: 'Tên khách hàng' },
    { field: 'customerTel', label: 'Số điện thoại' },
    { field: 'retailCustomers', label: 'Khách lẻ' },
    { field: 'purchaseDebts', label: 'Công nợ mua hàng' },
    { field: 'repairDebts', label: 'Công nợ sữa chữa' },
    { field: 'orderQuantity', label: 'Số lượng đơn hàng' },
    { field: 'orderReceiptDate', label: 'Ngày nhận đơn' },
    { field: 'orderReturnDate', label: 'Ngày trả đơn' },
];

const pageSizeOptions = [10, 25, 50];

const CustomerList: React.FC = () => {
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof Customer>>(['customerId', 'customerName']);
    const [selectAll, setSelectAll] = useState(false); // Trạng thái chọn tất cả
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenConfig, setIsOpenConfig] = useState<boolean>(false);
    const sampleCustomers: Customer[] = [
        {
            customerId: 'KH00001',
            customerName: 'Trần Minh Uy',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00003',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00004',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00005',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00006',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00007',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00008',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00009',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00010',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00011',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
        {
            customerId: 'KH00012',
            customerName: 'Nguyen Van A',
            customerTel: '0978654231',
            orderQuantity: 15,
            orderReceiptDate: '03/04/2023',
            orderReturnDate: '07/08/2023',
            purchaseDebts: '0',
            repairDebts: '0',
            retailCustomers: 'Khách lẻ',
        },
    ];

    const navigate = useNavigate();

    const handleColumnToggle = (field: keyof Customer) => {
        if (visibleColumns.includes(field)) {
            setVisibleColumns(visibleColumns.filter((col) => col !== field));
        } else {
            setVisibleColumns([...visibleColumns, field]);
        }
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        setSelectedRows(selectAll ? [] : visibleCustomers.map((customer) => customer.customerId));
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

    // Tính toán dữ liệu hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, sampleCustomers.length);
    const visibleCustomers = sampleCustomers.slice(startIndex, endIndex);
    const lastPage = Math.ceil(sampleCustomers.length / pageSize);

    return (
        <div className="customer-page__list">
            <FilterCustomer />
            <DragDropContext onDragEnd={handleColumnReorder}>
                {isOpenConfig ? (
                    <ColumnConfig columns={columns} visibleColumns={visibleColumns} onColumnToggle={handleColumnToggle} onColumnReorder={handleColumnReorder} setIsOpen={setIsOpenConfig} />
                ) : null}

                <div className="customer-page__list__tables">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="custom-cell">
                                        <CustomButton
                                            text=""
                                            width="25px"
                                            height="25px"
                                            boxShadow="none"
                                            borderHover="transparent"
                                            backgroundColor="transparent"
                                            backgroundColorHover="transparent"
                                            borderRadius="50%"
                                            icon={SettingColIcon}
                                            className="btn-open-setting"
                                            onClick={() => setIsOpenConfig(!isOpenConfig)}
                                        />
                                    </TableCell>
                                    <TableCell className="custom-cell">
                                        <Checkbox
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            icon={<img src={UncheckIcon} alt="" />}
                                            checkedIcon={<img src={CheckedIcon} alt="" />}
                                            className="custom-checkbox"
                                        />
                                    </TableCell>
                                    {visibleColumns.map((column) => (
                                        <TableCell key={column}>
                                            {columns.find((col) => col.field === column)?.label}{' '}
                                            <button>
                                                <img src={SortIcon} alt="" />
                                            </button>{' '}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visibleCustomers.map((customer) => (
                                    <TableRow key={customer.customerId}>
                                        <TableCell className="custom-cell"></TableCell>
                                        <TableCell className="custom-cell">
                                            <Checkbox
                                                checked={selectedRows.includes(customer.customerId)}
                                                onChange={() => handleSelectRow(customer.customerId)}
                                                icon={<img src={UncheckIcon} alt="" />}
                                                checkedIcon={<img src={CheckedIcon} alt="" />}
                                                className="custom-checkbox"
                                            />
                                        </TableCell>
                                        {visibleColumns.map((column) => {
                                            console.log('column', column);
                                            return (
                                                <TableCell
                                                    className={`${column === 'customerName' ? 'color-name' : ''}`}
                                                    key={column}
                                                    onClick={() => {
                                                        navigate(`/customers/${customer['customerId']}`);
                                                    }}
                                                >
                                                    {customer[column]}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </DragDropContext>
            <div className="customer-page__list__pagination">
                <div className="customer-page__list__pagination__select">
                    <p>
                        Hiển thị 1 - {pageSize} của {sampleCustomers.length}
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

                <div className="customer-page__list__pagination__number">
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
                        count={Math.ceil(sampleCustomers.length / pageSize)}
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
            </div>
        </div>
    );
};

export default CustomerList;
