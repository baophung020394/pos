import CustomButton from '@components/Button';
import FilterCustomer from '@features/Filters/FilterCustomer';
import { Checkbox, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { Customer, CustomerResponse } from 'src/models/customer';
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
import useApi from '@hooks/useApi';
import './customer.scss';
import ModelCustom from '@components/ModelCustom';
import { useDispatch } from 'react-redux';
import { setCurrentCus } from '@store/customerSlice';
import axiosClient from '@apis/axios';
import FormAddCustomer from '@features/forms/customer/FormAddCustomer';

const columns: { field: keyof Customer; label: string }[] = [
    // { field: 'customerId', label: 'Mã khách hàng' },
    { field: 'customerName', label: 'Tên khách hàng' },
    { field: 'customerGroupName', label: 'Nhóm khách hàng' },
    { field: 'customerCode', label: 'Mã Khách Hàng' },
    { field: 'gender', label: 'Giới tính' },
    { field: 'phoneNumber', label: 'Số điện thoại' },
    { field: 'birthDay', label: 'Sinh nhật' },
    { field: 'email', label: 'Ngày nhận đơn' },
    { field: 'address', label: 'Địa chỉ' },
    { field: 'note', label: 'Ghi chú' },
    { field: 'statusName', label: 'Trạng thái' },
    { field: 'taxCode', label: 'Mã số thuế' },
    { field: 'hastag', label: 'Tag' },
    { field: 'facebookLink', label: 'Link facebook' },
    { field: 'debt', label: 'Debt' },
    { field: 'areaCityName', label: 'areaCityName' },
    { field: 'areaDistrictName', label: 'areaDistrictName' },
    { field: 'areaCommuneName', label: 'areaCommuneName' },
    { field: 'createdDate', label: 'Ngày tạo' },
    { field: 'createdByName', label: 'Người tạo' },
    { field: 'modifiedDate', label: 'Ngày sửa' },
    { field: 'modifiedByName', label: 'Người sửa' },
];

const pageSizeOptions = [20, 50, 100, 200, 500];

const CustomerList: React.FC = () => {
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof Customer>>(['customerCode', 'customerName', 'phoneNumber', 'customerGroupName', 'createdDate', 'statusName']);
    const [selectAll, setSelectAll] = useState(false); // Trạng thái chọn tất cả
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenConfig, setIsOpenConfig] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [isOpenAddCus, setIsOpenAddCus] = useState<boolean>(false);
    const apiUrl = '/api/Customer/list'; // Đường dẫn cụ thể đến API
    const { data, loading, error } = useApi<CustomerResponse>(apiUrl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenConfigColumn = () => setIsOpenConfig(!isOpenConfig);
    const handleCloseConfigColumn = () => setIsOpenConfig(false);
    const handleCloseAddCus = () => setIsOpenAddCus(false);

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

    const handleSearch = (value: string) => {
        setValueSearch(value);
    };

    const handleGoPageDetail = (customer: Customer, column: string) => {
        if (column === 'customerName') {
            navigate(`/customers/${customer['customerId']}`);
            dispatch(setCurrentCus(customer));
        }
    };

    const handleOnClick = useCallback(() => {
        setIsOpenAddCus(!isOpenAddCus);
    }, []);

    // Tính toán dữ liệu hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = data ? Math.min(startIndex + pageSize, data.data.length) : 0;
    const visibleCustomers = data
        ? data.data
              .filter(
                  (customer) =>
                      customer?.customerCode?.toLowerCase().includes(valueSearch.toLowerCase()) ||
                      customer?.customerName?.toLowerCase().includes(valueSearch.toLowerCase()) ||
                      customer?.phoneNumber?.toLowerCase().includes(valueSearch.toLowerCase())
              )
              .slice(startIndex, endIndex)
        : [];
    const lastPage = data ? Math.ceil(data.data.length / pageSize) : 0;

    return (
        <div className="customer-page__list">
            <FilterCustomer getValueSearch={handleSearch} onClick={handleOnClick} />
            <DragDropContext onDragEnd={handleColumnReorder}>
                <ModelCustom
                    isOpen={isOpenConfig}
                    onClose={handleCloseConfigColumn}
                    title=""
                    okButtonText=""
                    cancelButtonText=""
                    onCancel={handleCloseConfigColumn}
                    className="customer-page__list__modal"
                >
                    <ColumnConfig columns={columns} visibleColumns={visibleColumns} onColumnToggle={handleColumnToggle} onColumnReorder={handleColumnReorder} setIsOpen={setIsOpenConfig} />
                </ModelCustom>

                <ModelCustom isOpen={isOpenAddCus} onClose={handleCloseAddCus} title="" okButtonText="" cancelButtonText="" onCancel={handleCloseAddCus} className="customer-page__list__modal">
                    <FormAddCustomer handleCloseAddCus={handleCloseAddCus} />
                    {/* <h1>Form Add</h1>
                    <button
                        onClick={async () => {
                            const object: any = {
                                CustomerCode: 'KH12343',
                                customerName: 'baophung',
                                Gender: 'Nam',
                                PhoneNumber: '0123123123',
                                BirthDay: '02/03/1994',
                                Email: 'baomap@gmail.com',
                                Address: '192 Ham Tu',
                                Note: 'Test',
                                Status: 'Dang hoat dong',
                                TaxCode: 'taxcode',
                                Hastag: 'hastag',
                                FacebookLink: 'facebook',
                                Debt: '1000000',
                                AreaCityId: 'hochiminh',
                                AreaDistrictId: '11',
                                CustomerGroupId: 'dai ly',
                            };
                            const response = await axiosClient.post<any>('/api/Customer/save', null, { params: object });
                            console.log('response', response);
                        }}
                    >
                        Add
                    </button> */}
                </ModelCustom>

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
                                            onClick={handleOpenConfigColumn}
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
                                            return (
                                                <TableCell className={`${column === 'customerName' ? 'color-name' : ''}`} key={column} onClick={() => handleGoPageDetail(customer, column)}>
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

export default React.memo(CustomerList);
