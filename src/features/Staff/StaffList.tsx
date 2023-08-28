import CustomButton from '@components/Button';
import ModelCustom from '@components/ModelCustom';
import FormAddStaff from '@features/forms/staff/FormAddStaff';
import useApi from '@hooks/useApi';
import { Staff, StaffResponse } from '@models/user/staff';
import { Box, Checkbox, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { showErrorToast } from '@store/actions/actionToast';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import 'react-resizable/css/styles.css';
import { useNavigate } from 'react-router-dom';
import AddIcon from '../../assets/images/customer/add.svg';
import CheckedIcon from '../../assets/images/customer/checkboxicon.svg';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import FirstPageIcon from '../../assets/images/customer/firstpage.svg';
import LastPageIcon from '../../assets/images/customer/lastpage.svg';
import NextIcon from '../../assets/images/customer/next.svg';
import PrevIcon from '../../assets/images/customer/prev.svg';
import SortIcon from '../../assets/images/customer/sort.svg';
import UncheckIcon from '../../assets/images/customer/uncheckbox.svg';
import './staff.scss';

const columns: { field: keyof Staff; label: string }[] = [
    // { field: 'customerId', label: 'Mã khách hàng' },
    { field: 'firstName', label: 'Tên nhân viên' },
    { field: 'phone', label: 'Số điện thoại' },
    { field: 'roleName', label: 'Vai trò' },
    { field: 'branchName', label: 'Chi nhánh' },
    { field: 'createdDate', label: 'Ngày tạo' },
    { field: 'status', label: 'Trạng thái' },
];

const pageSizeOptions = [20, 50, 100, 200, 500];

const StaffList: React.FC = () => {
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof Staff>>(['firstName', 'phone', 'roleName', 'branchName', 'createdDate', 'status']);
    const [selectAll, setSelectAll] = useState(false); // Trạng thái chọn tất cả
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenConfig, setIsOpenConfig] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [isOpenAddStaff, setIsOpenAddStaff] = useState<boolean>(false);
    const apiUrl = '/api/User/list'; // Đường dẫn cụ thể đến API
    const { data } = useApi<StaffResponse>(apiUrl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseAddStaff = () => setIsOpenAddStaff(false);

    const handleAddStaffSuccess = (newStaff: Staff) => {
        setStaffs([...staffs, newStaff]);
    };

    useEffect(() => {
        console.log('setStaffs', data);
        if (data?.success) {
            setStaffs(data.data);
        } else if (!data?.success && data?.errors) {
            showErrorToast(data?.errors[0] || '');
        }
    }, [data]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        setSelectedRows(selectAll ? [] : visibleStaffs.map((staff) => staff.userId));
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

    const handleGoPageDetail = (staff: Staff, column: string) => {
        if (column === 'firstName') {
            navigate(`/customers/${staff['userId']}`);
            // dispatch(setCurrentCus(staff));
        }
    };

    const handleOpenAddStaff = useCallback(() => {
        setIsOpenAddStaff(!isOpenAddStaff);
    }, []);

    // Tính toán dữ liệu hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = staffs ? Math.min(startIndex + pageSize, staffs.length) : 0;
    const visibleStaffs = staffs
        ? staffs
              .filter((customer) => customer?.firstName?.toLowerCase()?.includes(valueSearch.toLowerCase()) || customer?.phone?.toLowerCase()?.includes(valueSearch.toLowerCase()))
              .slice(startIndex, endIndex)
        : [];
    const lastPage = staffs ? Math.ceil(staffs.length / pageSize) : 0;

    return (
        <>
            <Box className="btn-add">
                <CustomButton
                    text="Thêm nhân viên"
                    maxHeight={45}
                    minHeight={32}
                    minWidth={32}
                    backgroundColor="#007AFF"
                    backgroundColorHover="#007AFF"
                    boxShadow='none'
                    borderRadius="50%"
                    icon={AddIcon}
                    className="btn-add-cus"
                    onClick={handleOpenAddStaff}
                />
            </Box>

            <div className="staff-page__list">
                <DragDropContext onDragEnd={handleColumnReorder}>
                    <ModelCustom isOpen={isOpenAddStaff} onClose={handleCloseAddStaff} title="" okButtonText="" cancelButtonText="" onCancel={handleCloseAddStaff} className="staff-page__list__modal">
                        <FormAddStaff onClose={handleCloseAddStaff} onAddSuccess={handleAddStaffSuccess} />
                    </ModelCustom>

                    <div className="staff-page__list__tables">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
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
                                            <TableCell key={column} style={{ width: column === 'firstName' ? '200px' : '' }}>
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
                                    {visibleStaffs.map((staff) => (
                                        <TableRow key={staff.userId}>
                                            <TableCell className="custom-cell">
                                                <Checkbox
                                                    checked={selectedRows.includes(staff.userId)}
                                                    onChange={() => handleSelectRow(staff.userId)}
                                                    icon={<img src={UncheckIcon} alt="" />}
                                                    checkedIcon={<img src={CheckedIcon} alt="" />}
                                                    className="custom-checkbox"
                                                />
                                            </TableCell>
                                            {visibleColumns.map((column) => {
                                                // const date = new Date(staff['createdDate']);
                                                // const convertDate = format(date, 'dd/MM/yyyy');
                                                return (
                                                    <TableCell key={column} onClick={() => handleGoPageDetail(staff, column)}>
                                                        <Box className="table-body">
                                                            <Typography component="p" className={`${column === 'firstName' ? 'color-name' : ''}`}>
                                                                {/* {column === 'createdDate' ? convertDate : staff[column]} */}
                                                                {staff[column]}
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
                <div className="staff-page__list__pagination">
                    <div className="staff-page__list__pagination__select">
                        <p>
                            Hiển thị 1 - {staffs?.length} của {staffs?.length}
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
                        <div className="staff-page__list__pagination__number">
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

export default React.memo(StaffList);
