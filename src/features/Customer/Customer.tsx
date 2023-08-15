import CustomButton from '@components/Button'
import LazyImage from '@components/Image'
import {
  Box,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { CustomerDetail } from 'src/models/customer'
import DropdownIcon from '../../assets/images/customer/dropdown.svg'
import FirstPageIcon from '../../assets/images/customer/firstpage.svg'
import LastPageIcon from '../../assets/images/customer/lastpage.svg'
import NextIcon from '../../assets/images/customer/next.svg'
import OpenNewTabIcon from '../../assets/images/customer/open-new-tab.svg'
import PrevIcon from '../../assets/images/customer/prev.svg'
import './customer.scss'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className='tabs'
      {...other}
    >
      {value === index && (
        <Box className='tab-child'>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const columns: { field: keyof CustomerDetail; label: string }[] = [
  { field: 'idTag', label: 'Số phiếu' },
  { field: 'orderReceiptDate', label: 'Ngày nhận' },
  { field: 'orderReturnDate', label: 'Ngày trả' },
  { field: 'service', label: 'Dịch vụ' },
  { field: 'technicalName', label: 'Kỹ thuật' },
  { field: 'total', label: 'Thành tiền' },
  { field: 'status', label: 'Trạng thái' }
]

const pageSizeOptions = [10, 25, 50]

const Customer: React.FC = () => {
  const [value, setValue] = React.useState(0)
  const [currentPage, setCurrentPage] = useState(1) // Trang hiện tại
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const sampleCustomers: CustomerDetail[] = [
    {
      idTag: '6871',
      orderReceiptDate: '03/04/2023',
      orderReturnDate: '07/08/2023',
      technicalName: 'Tuan',
      service: 'Thay camera iPhone 12 Pro Max',
      total: '1,800,000',
      status: 'Trả lại'
    },
    {
      idTag: '6872',
      orderReceiptDate: '03/04/2023',
      orderReturnDate: '07/08/2023',
      technicalName: 'Bao',
      service: 'Thay mặt kính Samsung Galaxy Note 20 Ultra, Thay ...',
      total: '1,800,000',
      status: 'Đang sửa'
    },
    {
      idTag: '6873',
      orderReceiptDate: '03/04/2023',
      orderReturnDate: '07/08/2023',
      service: 'Thay camera iPhone 12 Pro Max',
      technicalName: 'Thanh',
      total: '1,800,000',
      status: 'Sửa xong'
    },
    {
      idTag: '6874',
      orderReceiptDate: '03/04/2023',
      orderReturnDate: '07/08/2023',
      service: 'Thay camera iPhone 12 Pro Max',
      technicalName: 'Thanh',
      total: '1,800,000',
      status: 'Đã trả khách'
    },
    {
      idTag: '6874',
      orderReceiptDate: '03/04/2023',
      orderReturnDate: '07/08/2023',
      service: 'Thay camera iPhone 12 Pro Max',
      technicalName: 'Thanh',
      total: '1,800,000',
      status: 'Hoàn thành'
    }
  ]

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSize = event.target.value as number
    setPageSize(newSize)
    setCurrentPage(1) // Reset về trang đầu tiên khi thay đổi số lượng item trên 1 trang
  }

  // Tính toán dữ liệu hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, sampleCustomers.length)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const visibleCustomers = sampleCustomers.slice(startIndex, endIndex)
  const lastPage = Math.ceil(sampleCustomers.length / pageSize)
  const statusClassMap: { [key: string]: string } = {
    'Trả lại': 'status-return',
    'Đang sửa': 'status-fixing',
    'Sửa xong': 'status-done',
    'Đã trả khách': 'status-return-cus',
    'Hoàn thành': 'status-completed'
  }
  return (
    <Box className='customer-detail'>
      <Box className='customer-detail__heading'>
        <Typography component='p'>Trần Minh Uy</Typography>
      </Box>
      <Box className='customer-detail__information'>
        <Box className='customer-detail__information__person'>
          <Box className='heading'>
            <Typography component='p'>Thông tin cá nhân</Typography>
            <Box className='open-new-tab'>
              <Typography component='p'>Chỉnh sửa</Typography>
              <LazyImage src={OpenNewTabIcon} alt='Open new tab' />
            </Box>
          </Box>
          <Box className='table'>
            <Box className='left'>
              <Box className='left-title'>
                <Typography component='p'>Số điện thoại : </Typography>
                <Typography component='p'>Giới tính : </Typography>
                <Typography component='p'>Email : </Typography>
                <Typography component='p'>Facebook : </Typography>
                <Typography component='p'>Tag : </Typography>
              </Box>
              <Box className='left-content'>
                <Typography component='p'>0978654231 </Typography>
                <Typography component='p'>Nam </Typography>
                <Typography component='p'> ... </Typography>
                <Typography component='p'> ... </Typography>
                <Typography component='p'> ... </Typography>
              </Box>
            </Box>
            <Box className='right'>
              <Box className='right-title'>
                <Typography component='p'>Trạng thái : </Typography>
                <Typography component='p'>Nhóm khách hàng :</Typography>
                <Typography component='p'>Mã khách hàng :</Typography>
                <Typography component='p'>Mã số thuế : </Typography>
                <Typography component='p'>Người tạo : </Typography>
              </Box>
              <Box className='right-content'>
                <Typography component='p' className='status'>
                  Đang hoạt động
                </Typography>
                <Typography component='p' className='customer-id'>
                  Khách lẻ
                </Typography>
                <Typography component='p'> KH00001 </Typography>
                <Typography component='p'> ... </Typography>
                <Typography component='p'> Phạm Linh </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className='customer-detail__information__trade'>
          <Box className='heading'>
            <Typography component='p'>Thông tin cá nhân</Typography>
            <Box className='open-new-tab'>
              <Typography component='p'>Chỉnh sửa</Typography>
              <LazyImage src={OpenNewTabIcon} alt='Open new tab' />
            </Box>
          </Box>
          <Box className='table'>
            <Box className='left'>
              <Box className='left-title'>
                <Typography component='p'>Số điện thoại : </Typography>
                <Typography component='p'>Giới tính : </Typography>
                <Typography component='p'>Email : </Typography>
                <Typography component='p'>Facebook : </Typography>
                <Typography component='p'>Tag : </Typography>
              </Box>
              <Box className='left-content'>
                <Typography component='p'>0978654231 </Typography>
                <Typography component='p'>Nam </Typography>
                <Typography component='p'> ... </Typography>
                <Typography component='p'> ... </Typography>
                <Typography component='p'> ... </Typography>
              </Box>
            </Box>
            <Box className='right'>
              <Box className='right-title'>
                <Typography component='p'>Trạng thái : </Typography>
                <Typography component='p'>Nhóm khách hàng :</Typography>
                <Typography component='p'>Mã khách hàng :</Typography>
                <Typography component='p'>Mã số thuế : </Typography>
                <Typography component='p'>Người tạo : </Typography>
              </Box>
              <Box className='right-content'>
                <Typography component='p' className='status'>
                  Đang hoạt động
                </Typography>
                <Typography component='p' className='customer-id'>
                  Khách lẻ
                </Typography>
                <Typography component='p'> KH00001 </Typography>
                <Typography component='p'> ... </Typography>
                <Typography component='p'> Phạm Linh </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className='customer-detail__tables'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Lịch sử mua hàng' {...a11yProps(0)} />
            <Tab label='Lịch sử sửa chữa' {...a11yProps(1)} />
            <Tab label='Công nợ mua hàng' {...a11yProps(2)} />
            <Tab label='Công nợ sửa chữa' {...a11yProps(3)} />
            <Tab label='Ghi chú' {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box className='customer-page__list__tables'>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.field}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleCustomers.map((customer: CustomerDetail) => (
                    <TableRow key={customer.idTag}>
                      {columns.map((col) => (
                        <TableCell key={col.field}>
                          {col.field === 'status' ? (
                            <p className={statusClassMap[customer.status]}>{customer.status}</p>
                          ) : (
                            customer[col.field]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box className='customer-page__list__pagination'>
            <Box className='customer-page__list__pagination__select'>
              <p>
                Hiển thị 1 - {pageSize} của {sampleCustomers.length}
              </p>
              <Select
                className='select-option'
                value={pageSize}
                onChange={(event) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  handlePageSizeChange(event as any)
                }}
                IconComponent={() => {
                  return (
                    <>
                      <img src={DropdownIcon} alt='' />
                    </>
                  )
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </Box>

            <Box className='customer-page__list__pagination__number'>
              <CustomButton
                text=''
                maxHeight={40}
                maxWidth={40}
                minHeight={40}
                minWidth={40}
                backgroundColor='transparent'
                backgroundColorHover='transparent'
                borderRadius='50%'
                icon={FirstPageIcon}
                className='btn-first'
                onClick={() => setCurrentPage(1)}
              />
              <Pagination
                count={Math.ceil(sampleCustomers.length / pageSize)}
                page={currentPage}
                onChange={handlePageChange}
                className='pagination-list'
                renderItem={(item) => {
                  const isPrevious = item.type === 'previous'
                  const isNext = item.type === 'next'
                  const iconClassName = isPrevious ? PrevIcon : isNext ? NextIcon : ''

                  return <PaginationItem {...item} className={iconClassName} />
                }}
              />
              <CustomButton
                text=''
                maxHeight={40}
                maxWidth={40}
                minHeight={40}
                minWidth={40}
                backgroundColor='transparent'
                backgroundColorHover='transparent'
                borderRadius='50%'
                icon={LastPageIcon}
                className='btn-last'
                onClick={() => setCurrentPage(lastPage)}
              />
            </Box>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Item Two
        </CustomTabPanel>
      </Box>
    </Box>
  )
}

export default Customer
