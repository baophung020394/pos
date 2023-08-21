import axiosClient from '@apis/axios';
import CustomButton from '@components/Button';
import ModelCustom from '@components/ModelCustom';
import FormAddBranch from '@features/forms/Branch/FormAddBarnch';
import useApi from '@hooks/useApi';
import { Branch, BranchResponse } from '@models/branch';
import { Staff, StaffResponse } from '@models/user/staff';
import { Box, Checkbox, Collapse, MenuItem, Pagination, PaginationItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { showErrorToast, showSuccessToast } from '@store/actions/actionToast';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CollapseBlackIcon from '../../assets/images/branch/collapse-black.svg';
import CollapseBlueIcon from '../../assets/images/branch/collapse-blue.svg';
import AddIcon from '../../assets/images/customer/add.svg';
import CheckedIcon from '../../assets/images/customer/checkboxicon.svg';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import FirstPageIcon from '../../assets/images/customer/firstpage.svg';
import LastPageIcon from '../../assets/images/customer/lastpage.svg';
import NextIcon from '../../assets/images/customer/next.svg';
import PrevIcon from '../../assets/images/customer/prev.svg';
import SortIcon from '../../assets/images/customer/sort.svg';
import TickIcon from '../../assets/images/branch/tick.svg';
import UncheckIcon from '../../assets/images/customer/uncheckbox.svg';
import './branch.scss';
import FormEditBranch from '@features/forms/Branch/FormEditBranch';

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

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [branches, setBranches] = useState<Branch[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [isOpenAddPolicy, setIsOpenAddPolicy] = useState<boolean>(false);
    const [isOpenEditBranch, setIsOpenEditBranch] = useState<boolean>(false);
    const [editingBranch, setEditingBranch] = useState<Branch | undefined>(undefined);
    const apiUrl = '/api/Branch/list'; // Đường dẫn cụ thể đến API
    const { data } = useApi<BranchResponse>(apiUrl);
    const [openCollapse, setOpenCollapse] = useState<{ [key: string]: boolean }>({});

    const handleCloseAddBranch = () => setIsOpenAddPolicy(false);
    const handleCloseEditBranch = () => setIsOpenEditBranch(false);

    const handleAddBranchSuccess = (newBranch: Branch) => {
        setBranches([...branches, newBranch]);
    };

    useEffect(() => {
        console.log('setbranch', data);
        if (data?.success) {
            setBranches(data.data);
        } else if (!data?.success && data?.errors) {
            showErrorToast(data?.errors[0] || '');
        }
    }, [data]);

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
            callListStaff(branchId);
        }
    };

    const handleSelectRow = (selectedBranch: Branch, event: any) => {
        console.log('selectedBranch', selectedBranch);
        updateBranchDefault(selectedBranch, event.target.checked);
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

    const handleEditBranch = (branch: Branch) => {
        setIsOpenEditBranch(true);
        setEditingBranch(branch);
    };

    const updateBranchDefault = async (branch: Branch, selectedBranch: boolean) => {
        const url = '/api/Branch/save';
        const initData = { ...branch };
        initData.default = selectedBranch;
        const response: any = await axiosClient.post(url, null, { params: initData });
        console.log('response', response);
        if (response?.data.success) {
            showSuccessToast('Thay đổi thành công');
        }
    };

    const callListStaff = async (branchId: string) => {
        const url = '/api/User/list/ByBranch';
        const response: StaffResponse = await axiosClient.get(url, { params: { BranchId: branchId } });
        console.log('response', response);
        if (response.success) {
            alert('Success');
            setStaff(response.data);
        }
    };

    // Giả sử bạn có một hàm để cập nhật chi nhánh trong mảng branches
    const updateBranchInArray = (updatedBranch: Branch) => {
        setBranches((prevBranches) => {
            const newBranches = prevBranches.map((branch) => {
                if (branch.branchId === updatedBranch.branchId) {
                    return updatedBranch;
                } else if (updatedBranch.default) {
                    return { ...branch, default: false };
                }
                return branch;
            });

            return newBranches;
        });
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
    const endIndex = branches ? Math.min(startIndex + pageSize, branches.length) : 0;
    const visibleCustomers = branches ? branches : [];
    const lastPage = branches ? Math.ceil(branches.length / pageSize) : 0;

    return (
        <>
            <Box className="btn-add">
                <CustomButton
                    text="Thêm chi nhánh"
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
            </Box>

            <div className="branch-page__list">
                <ModelCustom isOpen={isOpenAddPolicy} onClose={handleCloseAddBranch} title="" okButtonText="" cancelButtonText="" onCancel={handleCloseAddBranch} className="branch-page__list__modal">
                    <FormAddBranch onClose={handleCloseAddBranch} onAddSuccess={handleAddBranchSuccess} />
                </ModelCustom>
                <ModelCustom isOpen={isOpenEditBranch} onClose={handleCloseAddBranch} title="" okButtonText="" cancelButtonText="" onCancel={handleCloseAddBranch} className="branch-page__list__modal">
                    <FormEditBranch initialData={editingBranch} onUpdateSuccess={updateBranchInArray} onClose={handleCloseEditBranch} />
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
                                                {visibleColumns.map((column) => {
                                                    return (
                                                        <TableCell key={column} onClick={() => handleEditBranch(branch)}>
                                                            {column === 'branchMasterName' ? (
                                                                <Box className="checkbox-col">
                                                                    {/* <Checkbox
                                                                        // checked={selectedRows.includes(branch.branchId)}
                                                                        defaultChecked={branch.default}
                                                                        onChange={(e: any) => handleSelectRow(branch, e)}
                                                                        icon={<img src={UncheckIcon} alt="" />}
                                                                        checkedIcon={<img src={CheckedIcon} alt="" />}
                                                                        className="custom-checkbox"
                                                                    /> */}
                                                                    {branch.default ? <img src={TickIcon} alt="" /> : null}
                                                                </Box>
                                                            ) : (
                                                                <Box className="table-body">
                                                                    <Typography component="p" className={`${column === 'branchCode' ? 'color-blue' : ''}`}>
                                                                        {branch[column]}
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
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
