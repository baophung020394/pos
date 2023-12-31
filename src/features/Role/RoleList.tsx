import CustomButton from '@components/Button';
import ModelCustom from '@components/ModelCustom';
import FormAddRole from '@features/forms/role/FormAddRole';
import useApi from '@hooks/useApi';
import { Functions, Role, RoleResponse } from '@models/role';
import { Box, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { showErrorToast } from '@store/actions/actionToast';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import AddIcon from '../../assets/images/customer/add.svg';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import FirstPageIcon from '../../assets/images/customer/firstpage.svg';
import LastPageIcon from '../../assets/images/customer/lastpage.svg';
import NextIcon from '../../assets/images/customer/next.svg';
import PrevIcon from '../../assets/images/customer/prev.svg';
import SortIcon from '../../assets/images/customer/sort.svg';
import './role.scss';

const columns: { field: keyof Role; label: string }[] = [
    { field: 'roleName', label: 'Tên vai trò' },
    { field: 'salseStaffActive', label: 'Số nhân viên đang hoạt động' },
    { field: 'salseStaffInactive', label: 'Số nhân viên ngừng hoạt động' },
    { field: 'createdDate', label: 'Ngày tạo' },
    { field: 'modifiedDate', label: 'Ngày cập nhật' },
    { field: 'note', label: 'Mô tả' },
];

const pageSizeOptions = [20, 50, 100, 200, 500];

const RoleList: React.FC = () => {
    const [roleList, setRoleList] = useState<Role[]>([]);
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof Role>>(['roleName', 'salseStaffActive', 'salseStaffInactive', 'createdDate', 'modifiedDate', 'note']);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenAddRole, setIsOpenAddRole] = useState<boolean>(false);
    const apiUrl = '/api/Role/list'; // Đường dẫn cụ thể đến API
    const { data } = useApi<RoleResponse>(apiUrl);
    const navigate = useNavigate();
    const handleAddRoleSuccess = (newRole: Role) => {
        setRoleList([...roleList, newRole]);
    };

    useEffect(() => {
        console.log('setRoleList', data);
        if (data?.success) {
            setRoleList(data.data);
        } else if (!data?.success && data?.errors) {
            showErrorToast(data?.errors[0] || '');
        }
    }, [data]);

    const handleCloseAddRole = () => setIsOpenAddRole(false);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newSize = event.target.value as number;
        setPageSize(newSize);
        setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số lượng item trên 1 trang
    };

    const handleOnClickAddRole = () => {
        // setIsOpenAddRole(!isOpenAddRole);
        navigate('/roles/add');
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
    const endIndex = roleList ? Math.min(startIndex + pageSize, roleList.length) : 0;
    const visibleCustomers = roleList ? roleList : [];
    const lastPage = roleList ? Math.ceil(roleList.length / pageSize) : 0;

    return (
        <>
            <Box className="btn-add">
                <CustomButton
                    text="Thêm vai trò"
                    maxHeight={45}
                    minHeight={32}
                    minWidth={32}
                    backgroundColor="#007AFF"
                    backgroundColorHover="#007AFF"
                    boxShadow='none'
                    borderRadius="50%"
                    icon={AddIcon}
                    className="btn-add-cus"
                    onClick={handleOnClickAddRole}
                />
            </Box>
            <div className="role-page__list">
                <ModelCustom isOpen={isOpenAddRole} onClose={handleCloseAddRole} title="" okButtonText="" cancelButtonText="" onCancel={handleCloseAddRole} className="customer-page__list__modal">
                    <FormAddRole onClose={handleCloseAddRole} onAddSuccess={handleAddRoleSuccess} />
                </ModelCustom>

                <DragDropContext onDragEnd={handleColumnReorder}>
                    <div className="role-page__list__tables">
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
                                    {visibleCustomers.map((role) => (
                                        <TableRow key={role.roleId}>
                                            {visibleColumns.map((column) => {
                                                return (
                                                    <TableCell key={column}>
                                                        <Box className="table-body">
                                                            {(() => {
                                                                const columnValue = role[column];
                                                                if (Array.isArray(columnValue)) {
                                                                    return columnValue.map((func: Functions | string, index: number) =>
                                                                        typeof func === 'string' ? (
                                                                            <Typography key={index} component="p">
                                                                                {func}
                                                                            </Typography>
                                                                        ) : (
                                                                            <Typography key={index} component="p">
                                                                                {func.functionName}
                                                                            </Typography>
                                                                        )
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <Typography component="p" className={`${column === 'roleName' ? 'color-blue' : ''}`}>
                                                                            {columnValue}
                                                                        </Typography>
                                                                    );
                                                                }
                                                            })()}
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

                <div className="role-page__list__pagination">
                    <div className="role-page__list__pagination__select">
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
                        <div className="role-page__list__pagination__number">
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

export default React.memo(RoleList);
