import CustomButton from '@components/Button';
import ModelCustom from '@components/ModelCustom';
import FilterCustomer from '@features/Filters/FilterCustomer';
import FormAddCustomer from '@features/forms/customer/FormAddCustomer';
import useApi from '@hooks/useApi';
import { Order, OrderResponse } from '@models/order';
import { Box, Checkbox, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { showErrorToast } from '@store/actions/actionToast';
import { setCurrentCus } from '@store/customerSlice';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import 'react-resizable/css/styles.css';
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
import EditPenIcon from '../../assets/images/fix/edit-pen.svg';
import Menu3DotIcon from '../../assets/images/fix/menu-3dot.svg';
import ColumnConfig from './ColumnConfig';
import './order.scss';

const columns: { field: keyof Order; label: string }[] = [
    { field: 'votes', label: 'Số phiếu' },
    { field: 'receiveDate', label: 'Ngày nhận' },
    { field: 'customerName', label: 'Tên khách hàng' },
    { field: 'phone', label: 'Số điện thoại' },
    { field: 'customerGroup', label: 'Nhóm KH' },
    { field: 'serviceName', label: 'Dịch vụ' },
    { field: 'technicalMember', label: 'Kỹ thuật' },
    { field: 'total', label: 'Thành tiền' },
    { field: 'statusName', label: 'Trạng thái' },
    { field: 'action', label: 'Hành động' },
];

const pageSizeOptions = [20, 50, 100, 200, 500];

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([
        {
            orderId: '1',
            votes: '#9875',
            receiveDate: '03/08/2023',
            customerName: '193 Hồ Sen',
            phone: '0708069605',
            customerGroup: 'Đại lý',
            serviceName: 'Thay mặt kính iPhone XS',
            technicalMember: 'Bình',
            total: '250,000',
            statusName: 'Hoàn thành',
            action: '',
            createdDate: '',
            createdName: '',
            modifiedDate: '',
            modifiedName: '',
        },
        {
            orderId: '2',
            votes: '#9875',
            receiveDate: '03/08/2023',
            customerName: 'Lương Thế Vinh',
            phone: '0977025698',
            customerGroup: 'Đại lý',
            serviceName: 'Thay mặt kính iPhone XS',
            technicalMember: 'Bình',
            total: '250,000',
            statusName: 'Sửa xong',
            action: '',
            createdDate: '',
            createdName: '',
            modifiedDate: '',
            modifiedName: '',
        },
        {
            orderId: '2',
            votes: '#9875',
            receiveDate: '03/08/2023',
            customerName: 'Lương Thế Vinh',
            phone: '0977025698',
            customerGroup: 'Đại lý',
            serviceName: 'Thay mặt kính iPhone XS',
            technicalMember: 'Bình',
            total: '250,000',
            statusName: 'Đang sửa',
            action: '',
            createdDate: '',
            createdName: '',
            modifiedDate: '',
            modifiedName: '',
        },
        {
            orderId: '2',
            votes: '#9875',
            receiveDate: '03/08/2023',
            customerName: 'Lương Thế Vinh',
            phone: '0977025698',
            customerGroup: 'Đại lý',
            serviceName: 'Thay mặt kính iPhone XS',
            technicalMember: 'Bình',
            total: '250,000',
            statusName: 'Trả lại',
            action: '',
            createdDate: '',
            createdName: '',
            modifiedDate: '',
            modifiedName: '',
        },
    ]);
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof Order>>([
        'votes',
        'receiveDate',
        'customerName',
        'phone',
        'customerGroup',
        'serviceName',
        'technicalMember',
        'total',
        'statusName',
        'action',
    ]);
    const [selectAll, setSelectAll] = useState(false); // Trạng thái chọn tất cả
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenConfig, setIsOpenConfig] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [isOpenAddCus, setIsOpenAddCus] = useState<boolean>(false);
    const apiUrl = '/api/Order/list'; // Đường dẫn cụ thể đến API
    const { data } = useApi<OrderResponse>(apiUrl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenConfigColumn = () => setIsOpenConfig(!isOpenConfig);
    const handleCloseConfigColumn = () => setIsOpenConfig(false);
    const handleCloseAddCus = () => setIsOpenAddCus(false);

    const handleAddCustomerSuccess = (newOrder: Order) => {
        setOrders([...orders, newOrder]);
    };

    const statusClassMap: { [key: string]: string } = {
        'Trả lại': 'status-return',
        'Đang sửa': 'status-fixing',
        'Sửa xong': 'status-done',
        'Hoàn thành': 'status-completed',
    };

    useEffect(() => {
        console.log('setOrders', data);
        if (data?.success) {
            setOrders(data.data);
        } else if (!data?.success && data?.errors) {
            showErrorToast(data?.errors[0] || '');
        }
    }, [data]);

    const handleColumnToggle = (field: keyof Order) => {
        if (visibleColumns.includes(field)) {
            setVisibleColumns(visibleColumns.filter((col) => col !== field));
        } else {
            setVisibleColumns([...visibleColumns, field]);
        }
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        setSelectedRows(selectAll ? [] : visibleOrders.map((order) => order.orderId));
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
    const endIndex = orders ? Math.min(startIndex + pageSize, orders.length) : 0;
    const visibleOrders = orders
        ? orders
              .filter(
                  (order) =>
                      order?.customerName?.toLowerCase()?.includes(valueSearch.toLowerCase()) ||
                      order?.serviceName?.toLowerCase()?.includes(valueSearch.toLowerCase()) ||
                      order?.phone?.toLowerCase()?.includes(valueSearch.toLowerCase())
              )
              .slice(startIndex, endIndex)
        : [];
    const lastPage = orders ? Math.ceil(orders.length / pageSize) : 0;

    return (
        <>
            <div className="order-page__list">
                <DragDropContext onDragEnd={handleColumnReorder}>
                    <ModelCustom
                        isOpen={isOpenConfig}
                        onClose={handleCloseConfigColumn}
                        title=""
                        okButtonText=""
                        cancelButtonText=""
                        onCancel={handleCloseConfigColumn}
                        className="order-page__list__modal"
                    >
                        <ColumnConfig columns={columns} visibleColumns={visibleColumns} onColumnToggle={handleColumnToggle} onColumnReorder={handleColumnReorder} setIsOpen={setIsOpenConfig} />
                    </ModelCustom>

                    {/* <ModelCustom isOpen={isOpenAddCus} onClose={handleCloseAddCus} title="" okButtonText="" cancelButtonText="" onCancel={handleCloseAddCus} className="order-page__list__modal">
                    <FormAddCustomer handleCloseAddCus={handleCloseAddCus} onAddSuccess={handleAddCustomerSuccess} />
                </ModelCustom> */}

                    <div className="order-page__list__tables">
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
                                    {visibleOrders.map((order) => (
                                        <TableRow key={order.orderId}>
                                            <TableCell className="custom-cell"></TableCell>
                                            {visibleColumns.map((column) => {
                                                return (
                                                    <TableCell key={column}>
                                                        <Box className="table-body">
                                                            <Typography component="p" className={`${column === 'customerName' ? 'color-name' : ''} ${column === 'votes' ? 'color-votes' : ''} `}>
                                                                {column === 'action' ? (
                                                                    <Box className="actions">
                                                                        <CustomButton
                                                                            title=""
                                                                            icon={EditPenIcon}
                                                                            width={25}
                                                                            height={25}
                                                                            backgroundColor="transparent"
                                                                            backgroundColorHover="transparent"
                                                                            boxShadow="none"
                                                                            className="btn-edit"
                                                                        />
                                                                        <CustomButton
                                                                            title=""
                                                                            icon={Menu3DotIcon}
                                                                            width={25}
                                                                            height={25}
                                                                            backgroundColor="transparent"
                                                                            backgroundColorHover="transparent"
                                                                            boxShadow="none"
                                                                            className="btn-menu"
                                                                        />
                                                                    </Box>
                                                                ) : column === 'statusName' ? (
                                                                    <Typography className={`${statusClassMap[order.statusName]}`} component="span">
                                                                        {order.statusName}
                                                                    </Typography>
                                                                ) : (
                                                                    order[column]
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
                <div className="order-page__list__pagination">
                    <div className="order-page__list__pagination__select">
                        <p>
                            Hiển thị 1 - {orders?.length} của {orders?.length}
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
                        <div className="order-page__list__pagination__number">
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
        </>
    );
};

export default React.memo(OrderList);
