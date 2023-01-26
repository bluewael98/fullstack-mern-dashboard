import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment } from '@mui/material'
import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </FlexBetween>
      <TextField 
        label="Search..."
        variant='standard'
        sx={{
          mb: "0.5rem",
          width: "15rem"
        }}
        onChange={(e) =>setSearchInput(e.target.value)}
        value={searchInput}
        inputProps={{
          endadornment: (
            <InputAdornment position="end">
                <IconButton
                onClick={() => {
                  setSearch(searchInput);
                  searchInput("");
                }}
                >
                  <Search />
                </IconButton>
            </InputAdornment>
          )
        }}
      />
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar