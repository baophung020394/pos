import CustomButton from '@components/Button';
import ModelCustom from '@components/ModelCustom';
import FormAddPolicy from '@features/forms/policy/FormAddPolicy';
import useApi from '@hooks/useApi';
import { Branch, BranchResponse } from '@models/branch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Checkbox, Collapse, IconButton, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import AddIcon from '../../assets/images/customer/add.svg';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import FirstPageIcon from '../../assets/images/customer/firstpage.svg';
import LastPageIcon from '../../assets/images/customer/lastpage.svg';
import NextIcon from '../../assets/images/customer/next.svg';
import PrevIcon from '../../assets/images/customer/prev.svg';
import SortIcon from '../../assets/images/customer/sort.svg';
import CheckedIcon from '../../assets/images/customer/checkboxicon.svg';
import UncheckIcon from '../../assets/images/customer/uncheckbox.svg';
import CollapseBlueIcon from '../../assets/images/branch/collapse-blue.svg';
import CollapseBlackIcon from '../../assets/images/branch/collapse-black.svg';
import './branch.scss';

const columns: { field: keyof Branch; label: string }[] = [
    { field: 'branchCode', label: 'Mã CN' },
    { field: 'branchName', label: 'Tên chi nhánh' },
    { field: 'phone', label: 'Số điện thoại' },
    { field: 'address', label: 'Địa chỉ' },
    { field: 'areaCommuneName', label: 'Khu vực' },
    { field: 'statusName', label: 'Trạng thái' },
    { field: 'branchMasterName', label: 'CN mặc định' },
];

const pageSizeOptions = [20, 50, 100, 200, 500];

const BranchList: React.FC = () => {
    const [visibleColumns, setVisibleColumns] = useState<Array<keyof Branch>>(['branchCode', 'branchName', 'phone', 'address', 'areaCommuneName', 'statusName', 'branchMasterName']);
    const [selectAll, setSelectAll] = useState(false); // Trạng thái chọn tất cả
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenAddPolicy, setIsOpenAddPolicy] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const apiUrl = '/api/Branch/list'; // Đường dẫn cụ thể đến API
    const { data, loading, error } = useApi<BranchResponse>(apiUrl);
    const [openCollapse, setOpenCollapse] = useState<{ [key: string]: boolean }>({});

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
    };

    const handleCloseAddPolicy = () => setIsOpenAddPolicy(false);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        setSelectedRows(selectAll ? [] : visibleCustomers.map((branch) => branch.branchId));
    };

    const handleSelectRow = (branchId: string) => {
        if (selectedRows.includes(branchId)) {
            setSelectedRows(selectedRows.filter((row) => row !== branchId));
        } else {
            setSelectedRows([...selectedRows, branchId]);
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

    const handleOnClickAddPolicy = () => {
        setIsOpenAddPolicy(!isOpenAddPolicy);
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
    const endIndex = data ? Math.min(startIndex + pageSize, data.data.length) : 0;
    const visibleCustomers = data ? data.data : [];
    const lastPage = data ? Math.ceil(data.data.length / pageSize) : 0;

    return (
        <>
            {/* <Box className="btn-add">
                <CustomButton
                    text="Thêm chính sách"
                    maxHeight={45}
                    minHeight={32}
                    minWidth={32}
                    backgroundColor="#007AFF"
                    backgroundColorHover="#007AFF"
                    borderRadius="50%"
                    icon={AddIcon}
                    className="btn-add-cus"
                    onClick={handleOnClickAddPolicy}
                />
            </Box> */}

            <div className="branch-page__list">
                <ModelCustom
                    isOpen={isOpenAddPolicy}
                    onClose={handleCloseAddPolicy}
                    title=""
                    okButtonText=""
                    cancelButtonText=""
                    onCancel={handleCloseAddPolicy}
                    className="customer-page__list__modal"
                >
                    <FormAddPolicy onClose={handleCloseAddPolicy} />
                </ModelCustom>

                <DragDropContext onDragEnd={handleColumnReorder}>
                    <Box className="branch-page__list__tables">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
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
                                    {visibleCustomers.map((branch) => (
                                        <React.Fragment key={branch.branchId}>
                                            <TableRow className={`${isOpenCollapse(branch.branchId) ? 'active-collapse-row' : ''}`}>
                                                <TableCell>
                                                    <CustomButton
                                                        text=""
                                                        backgroundColor="transparent"
                                                        backgroundColorHover="transparent"
                                                        boxShadow="none"
                                                        width={25}
                                                        height={25}
                                                        icon={isOpenCollapse(branch.branchId) ? CollapseBlueIcon : CollapseBlackIcon}
                                                        onClick={() => handleOpenCollapse(branch.branchId)}
                                                        className="btn-collapse"
                                                    />
                                                </TableCell>
                                                {visibleColumns.map((column) => (
                                                    <TableCell key={column}>
                                                        {column === 'branchMasterName' ? (
                                                            <Box className="checkbox-col">
                                                                <Checkbox
                                                                    checked={selectedRows.includes(branch.branchId)}
                                                                    onChange={() => handleSelectRow(branch.branchId)}
                                                                    icon={<img src={UncheckIcon} alt="" />}
                                                                    checkedIcon={<img src={CheckedIcon} alt="" />}
                                                                    className="custom-checkbox"
                                                                />
                                                            </Box>
                                                        ) : (
                                                            <Box className="table-body">
                                                                <Typography component="p" className={`${column === 'branchCode' ? 'color-blue' : ''}`}>
                                                                    {branch[column]}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                            <TableRow className="row-collapse">
                                                {isOpenCollapse(branch.branchId) ? (
                                                    <TableCell colSpan={6} className="row-collapse--col">
                                                        <Collapse in={isOpenCollapse(branch.branchId)} timeout="auto" unmountOnExit>
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
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </DragDropContext>

                <div className="branch-page__list__pagination">
                    <div className="branch-page__list__pagination__select">
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
                        <div className="branch-page__list__pagination__number">
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

export default React.memo(BranchList);
