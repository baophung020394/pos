// Search.tsx
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@assets/images/customer/search.svg';
import ImageCustom from '@components/Image';

type SearchProps = {
    placeholder?: string;
    onSearch?: (value: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch, placeholder }) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        if (!onSearch) return;
        onSearch(e.target.value);
    };

    return (
        <Box className="search-wrapper">
            <ImageCustom alt='' src={SearchIcon} className='icon-search' />
            <TextField className="search-wrapper__input" variant="outlined" size="small" value={searchValue} onChange={handleSearch} placeholder={placeholder} fullWidth />
        </Box>
    );
};

export default React.memo(Search);
