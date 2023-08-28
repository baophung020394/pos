import React, { useRef, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CustomTableWithCustomScroll = () => {
    const tableRef = useRef<any>(null);
    const scrollRef = useRef<any>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleScroll = (e: any) => {
        if (tableRef.current && scrollRef.current) {
            const scrollLeft = e.target.scrollLeft;
            tableRef.current.scrollLeft = scrollLeft;
        }
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: any) => {
        // console.log(isDragging)
        if (!isDragging) {
            return;
        }
        if (scrollRef.current && tableRef.current) {

            const clientX = e.clientX;
            const scrollLeft = scrollRef.current.scrollLeft;
            const tableScrollLeft = scrollLeft + clientX;
            setTimeout(() => {
                tableRef.current.scrollLeft = tableScrollLeft;
                console.log(tableRef.current.scrollLeft);
            }, 0);
            console.log(tableRef)
            console.log(tableScrollLeft)
            console.log(tableRef.current.scrollLeft)

        }
    };

    return (
        <div>
            <TableContainer component={Paper} >
                <Table ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            {/* 15 cột */}
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>

                            <TableCell>Column 15</TableCell>
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>

                            <TableCell>Column 15</TableCell>
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>

                            <TableCell>Column 15</TableCell>
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>

                            <TableCell>Column 15</TableCell>
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>

                            <TableCell>Column 15</TableCell>
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>

                            <TableCell>Column 15</TableCell>
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>

                            <TableCell>Column 15</TableCell>
                            <TableCell>Column 1</TableCell>
                            <TableCell>Column 2</TableCell>

                            <TableCell>Column 15</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>

                            <TableCell>Data 15</TableCell>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>

                            <TableCell>Data 15</TableCell>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>
                            {/* ... */}
                            <TableCell>Data 15</TableCell>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>
                            {/* ... */}
                            <TableCell>Data 15</TableCell>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>

                            <TableCell>Data 15</TableCell>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>

                            <TableCell>Data 15</TableCell>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>
                            {/* ... */}
                            <TableCell>Data 15</TableCell>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>
                            {/* ... */}
                            <TableCell>Data 15</TableCell>
                        </TableRow>
                        {/* Thêm dòng dữ liệu khác tương tự */}
                    </TableBody>
                </Table>
            </TableContainer>
            <div
                className="custom-scroll"
                ref={scrollRef}
                style={{
                    overflowX: 'scroll',
                    display: 'flex',
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                onScroll={handleScroll}
            >
                <div style={{ width: tableRef.current?.scrollWidth }} className='child'>
                    {/* Nội dung của thanh cuộn tùy chỉnh */}
                </div>
            </div>
        </div>
    );
};

export default CustomTableWithCustomScroll;
