import AddIcon from '@assets/images/customer/add.svg';
import CheckmarkIcon from '@assets/images/customer/checkmark.svg';
import DropdownIcon from '@assets/images/customer/dropdown.svg';
import FilterIcon from '@assets/images/customer/filter.svg';
import FirstPageIcon from '@assets/images/customer/firstpage.svg';
import LastPageIcon from '@assets/images/customer/lastpage.svg';
import NextIcon from '@assets/images/customer/next.svg';
import PrevIcon from '@assets/images/customer/prev.svg';
import SettingColIcon from '@assets/images/customer/setting-col.svg';
import SortIcon from '@assets/images/customer/sort.svg';
import CustomButton from '@components/Button';
import ImageCustom from '@components/Image';
import ModelCustom from '@components/ModelCustom';
import FilterCustomer from '@features/Filters/FilterCustomer';
import FormAddCustomer from '@features/forms/customer/FormAddCustomer';
import useApi from '@hooks/useApi';
import { Box, Checkbox, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { showErrorToast } from '@store/actions/actionToast';
import { setCurrentCus } from '@store/customerSlice';
import { IRootState } from '@store/index';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import 'react-resizable/css/styles.css';
import { useNavigate } from 'react-router-dom';
import { Customer, CustomerResponse } from 'src/models/customer';
import ColumnConfig from './ColumnConfig';
import './customer.scss';

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
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof Customer>>([
        'customerCode',
        'customerName',
        'phoneNumber',
        'customerGroupName',
        'createdDate',
        'statusName',
        'createdByName',
        'taxCode',
    ]);
    const [selectAll, setSelectAll] = useState(false); // Trạng thái chọn tất cả
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenConfig, setIsOpenConfig] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [isOpenAddCus, setIsOpenAddCus] = useState<boolean>(false);
    const [isOpenMenuFiles, setIsOpenMenuFiles] = useState<boolean>(false);
    const apiUrl = '/api/Customer/list'; // Đường dẫn cụ thể đến API
    const { data } = useApi<CustomerResponse>(apiUrl);
    const toggleSidebar = useSelector((state: IRootState) => state.themeConfig.sidebar);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnClickAddCus = () => setIsOpenAddCus(true);
    const handleOpenConfigColumn = () => setIsOpenConfig(!isOpenConfig);
    const handleCloseConfigColumn = () => setIsOpenConfig(false);
    const handleCloseAddCus = () => setIsOpenAddCus(false);

    const handleAddCustomerSuccess = (newCus: Customer) => {
        setCustomers([...customers, newCus]);
    };

    useEffect(() => {
        console.log('setCustomer', data);
        if (data?.success) {
            setCustomers(data.data);
        } else if (!data?.success && data?.errors) {
            showErrorToast(data?.errors[0] || '');
        }
    }, [data]);

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

    const statusClassMap: { [key: string]: string } = {
        'Đang hoạt động': 'status-active',
        'Ngưng hoạt động': 'status-deactive',
    };

    // Tính toán dữ liệu hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = customers ? Math.min(startIndex + pageSize, customers.length) : 0;
    const visibleCustomers = customers
        ? customers
              .filter(
                  (customer) =>
                      customer?.customerCode?.toLowerCase()?.includes(valueSearch.toLowerCase()) ||
                      customer?.customerName?.toLowerCase()?.includes(valueSearch.toLowerCase()) ||
                      customer?.phoneNumber?.toLowerCase()?.includes(valueSearch.toLowerCase())
              )
              .slice(startIndex, endIndex)
        : [];
    const lastPage = customers ? Math.ceil(customers.length / pageSize) : 0;

    const scrollContainerRef = useRef<any>(null);
    const tableRef = useRef<any>(null);

    const handleScroll = (e: any) => {
        if (scrollContainerRef.current && tableRef.current) {
            const scrollLeft = e.target.scrollLeft;
            tableRef.current.scrollLeft = scrollLeft;
        }
    };

    return (
        <>
            <Box className="btn-add" style={{ paddingLeft: toggleSidebar ? 25 : 290 }}>
                <FilterCustomer getValueSearch={handleSearch} onClick={handleOnClick} />
                <Box className="btn-add--right">
                    <Box className="options-files">
                        <CustomButton
                            text="Bộ lọc"
                            icon={FilterIcon}
                            className="btn-more"
                            backgroundColor="transparent"
                            backgroundColorHover="transparent"
                            minWidth={45}
                            maxWidth={45}
                            boxShadow="none"
                            onClick={() => setIsOpenMenuFiles(!isOpenMenuFiles)}
                        />

                        {/* {isOpenMenuFiles ? (
                            <Box className="files">
                                <CustomButton text="Nhập file" icon={ImportIcon} backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" className="btn-action-file" />
                                <CustomButton text="Xuất file" icon={ExportIcon} backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" className="btn-action-file" />
                            </Box>
                        ) : null} */}
                    </Box>
                    <CustomButton
                        text="Thêm khách hàng"
                        maxHeight={45}
                        minHeight={32}
                        minWidth={32}
                        backgroundColor="#007AFF"
                        backgroundColorHover="#007AFF"
                        boxShadow="none"
                        borderRadius="50%"
                        icon={AddIcon}
                        className="btn-add-cus"
                        onClick={handleOnClickAddCus}
                    />
                </Box>
            </Box>
            <div className="customer-page__list">
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
                        <FormAddCustomer handleCloseAddCus={handleCloseAddCus} onAddSuccess={handleAddCustomerSuccess} />
                    </ModelCustom>

                    <div className="customer-page__list__tables">
                        <TableContainer component={Paper} ref={tableRef}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="custom-cell">
                                            <CustomButton
                                                text=""
                                                width="15px"
                                                height="15px"
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
                                            <Box className="table-head">
                                                <Box className="wrap-checkbox">
                                                    <Checkbox checked={selectAll} onChange={handleSelectAll} className="custom-checkbox" />
                                                    <ImageCustom src={CheckmarkIcon} alt="" className="icon-checkmark" />
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        {visibleColumns.map((column) => (
                                            <TableCell
                                                key={column}
                                                className={`${column === 'createdDate' ? 'mwDate' : column === 'phoneNumber' ? 'mwDate' : column === 'statusName' ? 'mwDate' : ''} `}
                                            >
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
                                                <Box className="wrap-checkbox">
                                                    <Checkbox checked={selectedRows.includes(customer.customerId)} onChange={() => handleSelectRow(customer.customerId)} className="custom-checkbox" />

                                                    <ImageCustom src={CheckmarkIcon} alt="" className="icon-checkmark" />
                                                </Box>
                                            </TableCell>
                                            {visibleColumns.map((column) => {
                                                const date = new Date(customer['createdDate']);
                                                const convertDate = format(date, 'dd/MM/yyyy');
                                                return (
                                                    <TableCell key={column} onClick={() => handleGoPageDetail(customer, column)}>
                                                        <Box className="table-body">
                                                            <Typography component="p" className={`${column === 'customerName' ? 'color-name' : ''}`}>
                                                                {column === 'createdDate' ? (
                                                                    convertDate
                                                                ) : column === 'statusName' ? (
                                                                    <Typography component="p" className={`${statusClassMap[customer.statusName]}`}>
                                                                        {customer['statusName']}
                                                                    </Typography>
                                                                ) : (
                                                                    customer[column]
                                                                )}
                                                            </Typography>
                                                        </Box>
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
                            Hiển thị 1 - {customers?.length} của {customers?.length}
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
                                backgroundColor="#E0E6ED"
                                backgroundColorHover="transparent"
                                boxShadow="none"
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
                                backgroundColor="#E0E6ED"
                                backgroundColorHover="transparent"
                                boxShadow="none"
                                borderRadius="50%"
                                icon={LastPageIcon}
                                className="btn-last"
                                onClick={() => setCurrentPage(lastPage)}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default React.memo(CustomerList);
