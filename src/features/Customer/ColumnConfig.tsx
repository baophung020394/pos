import CustomButton from '@components/Button';
import { Checkbox, Paper, Typography } from '@mui/material';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Customer } from 'src/models/customer';
import CheckedIcon from '../../assets/images/customer/checkboxicon.svg';
import CloseIcon from '../../assets/images/customer/close.svg';
import UncheckIcon from '../../assets/images/customer/uncheckbox.svg';

interface ColumnConfigProps {
    columns: { field: keyof Customer; label: string }[];
    visibleColumns: Array<keyof Customer>;
    onColumnToggle: (field: keyof Customer) => void;
    onColumnReorder: (startIndex: number, endIndex: number) => void;
    setIsOpen: (data: boolean) => void;
}

const ColumnConfig: React.FC<ColumnConfigProps> = ({
    columns,
    visibleColumns,
    onColumnToggle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onColumnReorder,
    setIsOpen,
}) => {
    return (
        <div className="customer-page__list__config-col">
            <div className="config-col__heading">
                <Typography variant="h2" component="h2">
                    Điều chỉnh cột hiển thị
                </Typography>
                <CustomButton text="" backgroundColor="transparent" backgroundColorHover="transparent" borderRadius="50%" icon={CloseIcon} className="btn-close" onClick={() => setIsOpen(false)} />
            </div>
            <div className="config-col__cols">
                <div className="config-col__cols__add">
                    <Paper>
                        <Typography variant="h2" component="h2">
                            Thêm Cột Hiển Thị
                        </Typography>
                        <div className="config-col__cols__add__content">
                            {columns.map((column) => (
                                <div key={column.field} className={`config-col__cols__add__content__row ${visibleColumns.includes(column.field) ? 'selected' : ''}`}>
                                    <Checkbox
                                        checked={visibleColumns.includes(column.field)}
                                        onChange={() => onColumnToggle(column.field)}
                                        icon={<img src={UncheckIcon} alt="" />}
                                        checkedIcon={<img src={CheckedIcon} alt="" />}
                                        className="custom-checkbox"
                                    />
                                    <label>{column.label}</label>
                                </div>
                            ))}
                        </div>
                    </Paper>
                </div>
                <div className="config-col__cols__display">
                    <Paper>
                        <Typography variant="h2" component="h2">
                            Cột Hiển Thị
                        </Typography>
                        <div className="config-col__cols__display__introduce">
                            <Typography component="p">Di chuyển để sắp xếp cột hiển thị</Typography>
                        </div>
                        <Droppable droppableId="droppable2" direction="vertical">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="config-col__cols__display__rows">
                                    {visibleColumns.map((column, index) => (
                                        <Draggable key={column} draggableId={column.toString()} index={index}>
                                            {(provided) => (
                                                <div className="config-col__cols__display__rows__row" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    {columns.find((col) => col.field === column)?.label}
                                                    <CustomButton
                                                        text=""
                                                        minHeight={25}
                                                        minWidth={25}
                                                        backgroundColor="transparent"
                                                        backgroundColorHover="transparent"
                                                        borderRadius="50%"
                                                        icon={CloseIcon}
                                                        className="btn-close"
                                                        onClick={() => onColumnToggle(column)}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default ColumnConfig;
