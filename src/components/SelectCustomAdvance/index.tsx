import React, { useEffect, useRef, useState } from 'react';
import { Button, Popover, Input, List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import DropdownIcon from '@assets/images/customer/dropdown.svg';
interface Options {
    value: string;
    label: string;
}
interface SelectCustomAdvanceProps {
    options: Options[];
    onSelect: (optopn: Options) => void;
    placeholder?: string;
}
import './selectcustom.scss';

interface HTMLStyleableElement extends HTMLElement {
    style: CSSStyleDeclaration;
}

const SelectCustomAdvance: React.FC<SelectCustomAdvanceProps> = ({ options, onSelect, placeholder }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string>('');
    const selectRef = useRef<any>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (value: Options) => {
        setSelectedValue(value?.label);
        onSelect(value);
        handleClose();
    };

    console.log('options', options);
    const filteredOptions = options.filter((option) => option?.label.toLowerCase().includes(searchTerm?.toLowerCase()));

    useEffect(() => {
        console.log('anchorEl', anchorEl);
        if (anchorEl !== null) {
            const popoverPaper = document.querySelector('.MuiPopover-paper') as HTMLStyleableElement;
            console.log(popoverPaper);
            if (popoverPaper) {
                popoverPaper.style.width = `${selectRef.current.offsetWidth}px`;
            }
        }
    }, [anchorEl]);

    return (
        <Box className="select-custom-advance" ref={selectRef}>
            <Button aria-controls="fake-select" aria-haspopup="true" onClick={handleClick} endIcon={<img src={DropdownIcon} alt="" />}>
                {selectedValue || placeholder}
            </Button>
            <Popover
                id="fake-select"
                className="select-custom-popover"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Input placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} className="input-search" />
                <List className="list">
                    {filteredOptions?.map((option) => (
                        <ListItem className="list__item" button key={option.value} onClick={() => handleSelect(option)}>
                            <ListItemText primary={option?.label} className="list__text" />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};

export default SelectCustomAdvance;
