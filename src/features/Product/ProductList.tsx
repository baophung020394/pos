import CustomButton from '@components/Button';
import LazyImage from '@components/Image';
import AddIcon from '@assets/images/customer/add.svg';
import ModelCustom from '@components/ModelCustom';
import FilterCustomer from '@features/Filters/FilterCustomer';
import FormAddCustomer from '@features/forms/customer/FormAddCustomer';
import useApi from '@hooks/useApi';
import { Service, ServiceResponse } from '@models/service';
import { Box, Checkbox, Collapse, MenuItem, Pagination, PaginationItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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
import CopyIcon from '../../assets/images/service/copyicon.svg';
import IphoneImg from '../../assets/images/service/iphone.png';
import ColumnConfig from './ColumnConfig';
import CollapseBlackIcon from '../../assets/images/branch/collapse-black.svg';
import CollapseBlueIcon from '../../assets/images/branch/collapse-blue.svg';
import TickIcon from '../../assets/images/branch/tick.svg';
import FilterIcon from '@assets/images/customer/filter.svg';
import './product.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '@store/index';

const columns: { field: keyof Service; label: string }[] = [
    // { field: 'customerId', label: 'Mã khách hàng' },
    { field: 'image', label: 'Ảnh' },
    { field: 'serviceName', label: 'Tên dịch vụ' },
    { field: 'categoryName', label: 'Danh mục' },
    { field: 'retailPrice', label: 'Giá bán lẻ' },
    { field: 'agentPrice', label: 'Giá đại lý' },
    { field: 'entryPrice', label: 'Giá nhập' },
    { field: 'createdDate', label: 'Ngày tạo' },
    { field: 'modifiedDate', label: 'Ngày cập nhật' },
    { field: 'webSync', label: 'Đồng bộ web' },
    { field: 'reportPrice', label: 'Báo giá' },
];

const pageSizeOptions = [20, 50, 100, 200, 500];

const ProductList: React.FC = () => {
    const [services, setServices] = useState<Service[]>([
        {
            serviceId: '1',
            serviceCode: 'IP0014',
            image: IphoneImg,
            categoryName: 'Thay kính lưng iPhone',
            serviceName: 'Thay kính lưng iPhone 14 Pro Max',
            retailPrice: '750,000',
            agentPrice: '550,000',
            entryPrice: '150,000',
            createdDate: '03/08/2023',
            modifiedDate: '03/08/2023',
            webSync: false,
            reportPrice: '',
            createdName: '',
            modifiedName: '',
        },
        {
            serviceId: '2',
            serviceCode: 'IP0015',
            image: IphoneImg,
            categoryName: 'Thay kính lưng iPhone',
            serviceName: 'Thay kính lưng iPhone 14 Pro Max',
            retailPrice: '750,000',
            agentPrice: '550,000',
            entryPrice: '150,000',
            createdDate: '03/08/2023',
            modifiedDate: '03/08/2023',
            webSync: false,
            reportPrice: '',
            createdName: '',
            modifiedName: '',
        },
    ]);
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof Service>>([
        'image',
        'serviceName',
        'categoryName',
        'retailPrice',
        'entryPrice',
        'agentPrice',
        'createdDate',
        'modifiedDate',
        'webSync',
        'reportPrice',
    ]);
    const [selectAll, setSelectAll] = useState(false); // Trạng thái chọn tất cả
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenConfig, setIsOpenConfig] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [isOpenAddCus, setIsOpenAddCus] = useState<boolean>(false);
    const [openCollapse, setOpenCollapse] = useState<{ [key: string]: boolean }>({});
    const apiUrl = '/api/Services/list'; // Đường dẫn cụ thể đến API
    const { data } = useApi<ServiceResponse>(apiUrl);
    const toggleSidebar = useSelector((state: IRootState) => state.themeConfig.sidebar);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenConfigColumn = () => setIsOpenConfig(!isOpenConfig);
    const handleCloseConfigColumn = () => setIsOpenConfig(false);
    const handleCloseAddCus = () => setIsOpenAddCus(false);

    const handleAddServiceuccess = (newService: Service) => {
        setServices([...services, newService]);
    };

    useEffect(() => {
        console.log('setServices', data);
        if (data?.success) {
            setServices(data.data);
        } else if (!data?.success && data?.errors) {
            showErrorToast(data?.errors[0] || '');
        }
    }, [data]);

    const handleColumnToggle = (field: keyof Service) => {
        if (visibleColumns.includes(field)) {
            setVisibleColumns(visibleColumns.filter((col) => col !== field));
        } else {
            setVisibleColumns([...visibleColumns, field]);
        }
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        setSelectedRows(selectAll ? [] : visibleServices.map((service) => service.serviceId));
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

    const handleWebSyncToggle = (serviceId: string) => {
        const updatedServices = services.map((service) => (service.serviceId === serviceId ? { ...service, webSync: !service.webSync } : service));
        setServices(updatedServices);
    };

    // Hàm để kiểm tra xem hàng có đang mở rộng Collapsible hay không
    const isOpenCollapse = (branchId: string) => {
        return openCollapse[branchId] || false;
    };

    // Hàm để mở hoặc đóng Collapsible của hàng
    const handleOpenCollapse = (branchId: string) => {
        setOpenCollapse((prevState) => ({
            ...prevState,
            [branchId]: !prevState[branchId],
        }));
        console.log('isOpenCollapse(branchId)', isOpenCollapse(branchId));
        if (!isOpenCollapse(branchId)) {
            // callListStaff(branchId);
        }
    };

    // Tính toán dữ liệu hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = services ? Math.min(startIndex + pageSize, services.length) : 0;
    const visibleServices = services
        ? services
              .filter((service) => service?.serviceCode?.toLowerCase()?.includes(valueSearch.toLowerCase()) || service?.serviceName?.toLowerCase()?.includes(valueSearch.toLowerCase()))
              .slice(startIndex, endIndex)
        : [];
    const lastPage = services ? Math.ceil(services.length / pageSize) : 0;

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
                            // onClick={() => setIsOpenMenuFiles(!isOpenMenuFiles)}
                        />

                        {/* {isOpenMenuFiles ? (
                            <Box className="files">
                                <CustomButton text="Nhập file" icon={ImportIcon} backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" className="btn-action-file" />
                                <CustomButton text="Xuất file" icon={ExportIcon} backgroundColor="transparent" backgroundColorHover="transparent" boxShadow="none" className="btn-action-file" />
                            </Box>
                        ) : null} */}
                    </Box>
                    <CustomButton
                        text="Thêm sản phẩm"
                        maxHeight={45}
                        minHeight={32}
                        minWidth={32}
                        backgroundColor="#007AFF"
                        backgroundColorHover="#007AFF"
                        boxShadow="none"
                        borderRadius="50%"
                        icon={AddIcon}
                        className="btn-add-cus"
                        onClick={() => navigate('/products/add')}
                    />
                </Box>
            </Box>
            <div className="product-page__list">
                {/* <FilterCustomer getValueSearch={handleSearch} onClick={handleOnClick} /> */}
                <DragDropContext onDragEnd={handleColumnReorder}>
                    <ModelCustom
                        isOpen={isOpenConfig}
                        onClose={handleCloseConfigColumn}
                        title=""
                        okButtonText=""
                        cancelButtonText=""
                        onCancel={handleCloseConfigColumn}
                        className="product-page__list__modal"
                    >
                        <ColumnConfig columns={columns} visibleColumns={visibleColumns} onColumnToggle={handleColumnToggle} onColumnReorder={handleColumnReorder} setIsOpen={setIsOpenConfig} />
                    </ModelCustom>

                    <div className="product-page__list__tables">
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
                                        <TableCell></TableCell>
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
                                    {visibleServices.map((service) => (
                                        <React.Fragment key={service.serviceId}>
                                            <TableRow className={`${isOpenCollapse(service.serviceId) ? 'active-collapse-row' : ''}`}>
                                                <TableCell className="custom-cell"></TableCell>
                                                <TableCell className="custom-cell">
                                                    <Checkbox
                                                        checked={selectedRows.includes(service.serviceId)}
                                                        onChange={() => handleSelectRow(service.serviceId)}
                                                        icon={<img src={UncheckIcon} alt="" />}
                                                        checkedIcon={<img src={CheckedIcon} alt="" />}
                                                        className="custom-checkbox"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <CustomButton
                                                        text=""
                                                        backgroundColor="transparent"
                                                        backgroundColorHover="transparent"
                                                        boxShadow="none"
                                                        width={25}
                                                        height={25}
                                                        icon={isOpenCollapse(service.serviceId) ? CollapseBlueIcon : CollapseBlackIcon}
                                                        onClick={() => handleOpenCollapse(service.serviceId)}
                                                        className="btn-collapse"
                                                    />
                                                </TableCell>
                                                {visibleColumns.map((column) => {
                                                    const date = new Date(service['createdDate']);
                                                    const convertDate = format(date, 'dd/MM/yyyy');
                                                    return (
                                                        <TableCell key={column}>
                                                            <Box className="table-body">
                                                                <Typography component="p" className={`${column === 'serviceName' ? 'color-name' : ''}`}>
                                                                    {column === 'image' ? (
                                                                        <img src={service['image']} alt="" className="img-product" />
                                                                    ) : column === 'createdDate' ? (
                                                                        convertDate
                                                                    ) : column === 'webSync' ? (
                                                                        <Switch
                                                                            checked={service[column]}
                                                                            color="primary"
                                                                            onChange={() => handleWebSyncToggle(service.serviceId)}
                                                                            className="switch-button"
                                                                        />
                                                                    ) : column === 'reportPrice' ? (
                                                                        <CustomButton
                                                                            text=""
                                                                            width="30px"
                                                                            height="30px"
                                                                            boxShadow="none"
                                                                            borderHover="transparent"
                                                                            backgroundColor="transparent"
                                                                            backgroundColorHover="transparent"
                                                                            borderRadius="50%"
                                                                            icon={CopyIcon}
                                                                            className="btn-copy"
                                                                            // onClick={handleOpenConfigColumn}
                                                                        />
                                                                    ) : (
                                                                        service[column]
                                                                    )}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                            <TableRow className="row-collapse">
                                                {isOpenCollapse(service.serviceId) ? (
                                                    <TableCell colSpan={7} className="row-collapse--col">
                                                        <Collapse in={isOpenCollapse(service.serviceId)} timeout="auto" unmountOnExit>
                                                            <Box className="row-table-collapse">
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                <Box className="table-head">
                                                                                    <Typography component="p">Ảnh</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-head">
                                                                                    <Typography component="p">Tên linh kiện</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-head">
                                                                                    <Typography component="p">Số lượng</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-head">
                                                                                    <Typography component="p">Đơn giá</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-head">
                                                                                    <Typography component="p">Thành tiền</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p">
                                                                                        <img src={service['image']} alt="" className="img-product" />
                                                                                    </Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p" className="color-name">
                                                                                        Kính iPhone 14 Pro Max
                                                                                    </Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p">1</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p">80.000</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p">80.000</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>

                                                                        <TableRow className="row-total">
                                                                            <TableCell colSpan={2}>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p">Tổng:</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p">3</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p"></Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Box className="table-body">
                                                                                    <Typography component="p">139,000</Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                ) : null}
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                                    {/* {visibleServices.map((service) => (
                                    <>
                                        <TableRow key={service.serviceId}>
                                            <TableCell className="custom-cell"></TableCell>
                                            <TableCell className="custom-cell">
                                                <Checkbox
                                                    checked={selectedRows.includes(service.serviceId)}
                                                    onChange={() => handleSelectRow(service.serviceId)}
                                                    icon={<img src={UncheckIcon} alt="" />}
                                                    checkedIcon={<img src={CheckedIcon} alt="" />}
                                                    className="custom-checkbox"
                                                />
                                            </TableCell>
                                            {visibleColumns.map((column) => {
                                                const date = new Date(service['createdDate']);
                                                const convertDate = format(date, 'dd/MM/yyyy');
                                                return (
                                                    <React.Fragment key={service.serviceId}>
                                                        <TableCell key={column}>
                                                            <Box className="table-body">
                                                                <Typography component="p" className={`${column === 'serviceName' ? 'color-name' : ''}`}>
                                                                    {column === 'image' ? (
                                                                        <img src={service['image']} alt="" className="img-product" />
                                                                    ) : column === 'createdDate' ? (
                                                                        convertDate
                                                                    ) : column === 'webSync' ? (
                                                                        <Switch
                                                                            checked={service[column]}
                                                                            color="primary"
                                                                            onChange={() => handleWebSyncToggle(service.serviceId)}
                                                                            className="switch-button"
                                                                        />
                                                                    ) : column === 'reportPrice' ? (
                                                                        <CustomButton
                                                                            text=""
                                                                            width="30px"
                                                                            height="30px"
                                                                            boxShadow="none"
                                                                            borderHover="transparent"
                                                                            backgroundColor="transparent"
                                                                            backgroundColorHover="transparent"
                                                                            borderRadius="50%"
                                                                            icon={CopyIcon}
                                                                            className="btn-copy"
                                                                            // onClick={handleOpenConfigColumn}
                                                                        />
                                                                    ) : (
                                                                        service[column]
                                                                    )}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </TableRow>
                                        <TableRow className="row-collapse">
                                            {isOpenCollapse(service.serviceId) ? (
                                                <TableCell colSpan={6} className="row-collapse--col">
                                                    <Collapse in={isOpenCollapse(service.serviceId)} timeout="auto" unmountOnExit>
                                                        <Box className="row-table-collapse">
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            <Box className="table-head">
                                                                                <Typography component="p">Nhân viên</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-head">
                                                                                <Typography component="p">Tên đăng nhập</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-head">
                                                                                <Typography component="p">Phân quyền</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">Bảo</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">baophung</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">Nhân viên</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">Bảo</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">baophung</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">Nhân viên</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">Bảo</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">baophung</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">Nhân viên</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">Bảo</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">baophung</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box className="table-body">
                                                                                <Typography component="p">Nhân viên</Typography>
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            ) : null}
                                        </TableRow>
                                    </>
                                ))} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </DragDropContext>
                <div className="product-page__list__pagination">
                    <div className="product-page__list__pagination__select">
                        <p>
                            Hiển thị 1 - {services?.length} của {services?.length}
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
                        <div className="product-page__list__pagination__number">
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

export default React.memo(ProductList);
