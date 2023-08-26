import useApi from '@hooks/useApi';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DropdownIcon from '../../assets/images/customer/dropdown.svg';
import './select.scss';

interface SelectCityMultipleProps {
    endpoint: string; // Đường dẫn API endpoint
    minHeight?: number | string;
    maxHeight?: number | string;
    isOpen?: boolean;
    onChange?: (value: string) => void;
    onClick?: () => void;
    onClose: () => void;
    setIsOpenCity: (data: any) => void;
}

const SelectCityMultiple: React.FC<SelectCityMultipleProps> = ({ endpoint, minHeight, maxHeight, isOpen, onClick, onClose, onChange, setIsOpenCity }) => {
    const { data, loading, error } = useApi<any>(endpoint);
    const [selectCustomBoxPosition, setSelectCustomBoxPosition] = useState({ top: 0, left: 0, width: 0 });
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const filteredCities = data?.data.filter((item: any) => item.cityName.toLowerCase().includes(searchKeyword.toLowerCase()));

    useEffect(() => {
        const selectCustomRef = document.querySelector('.select-city-mul');
        const selectCustomBoxRef = document.querySelector('.select-city-mul__box');

        if (selectCustomRef && selectCustomBoxRef) {
            const rect = selectCustomRef.getBoundingClientRect();
            const top = rect.bottom; // Đặt vị trí top bằng bottom của .select-city-mul
            const left = rect.left; // Đặt vị trí left bằng left của .select-city-mul
            const width = rect.width; // Đặt vị trí left bằng left của .select-city-mul
            setSelectCustomBoxPosition({ top, left, width });
        }
    }, [isOpen]);

    const onChangeValue = (value: string) => {
        if (!onChange) return;
        console.log('value', value);
        setIsOpenCity(false);
        onChange(value);
        console.log(isOpen);
    };

    return (
        <Box className="select-city-mul" style={{ minHeight: minHeight, maxHeight: maxHeight }} onClick={onClick}>
            {isOpen ? (
                <Box
                    className="select-city-mul__box"
                    style={{
                        top: selectCustomBoxPosition.top,
                        left: selectCustomBoxPosition.left,
                        width: selectCustomBoxPosition.width,
                    }}
                >
                    <Box className="select-city-mul__search">
                        <input type="text" placeholder="Tìm kiếm vai trò" onChange={(event) => setSearchKeyword(event.target.value)} />
                    </Box>

                    <Box className="select-city-mul__items">
                        {filteredCities?.map((item: any) => (
                            <Typography component="p" key={item.cityId} onClick={() => onChangeValue(item.cityId)}>
                                {item.cityName}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            ) : null}

            <Box className="select-city-mul__icon">
                <img alt="icon-down" src={DropdownIcon} />
            </Box>
        </Box>
    );
};

export default SelectCityMultiple;
