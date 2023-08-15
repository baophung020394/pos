// Search.tsx
import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'

type SearchProps = {
  placeholder?: string
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <Box className='search-wrapper'>
      <TextField
        className='search-wrapper__input'
        variant='outlined'
        size='small'
        value={searchValue}
        onChange={handleSearch}
        placeholder={placeholder}
        fullWidth
      />
    </Box>
  )
}

export default React.memo(Search)
