import React, { Dispatch, SetStateAction } from 'react';
import { IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { FilterBarWrapper } from './FilterBar.styles';
import { StyledFormControl } from '@/styles/global';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export interface FilterBarOptions {
  rooms?: number;
  priceAsc: boolean;
}

interface Option {
  value?: number;
  label: string;
}

interface FilterBarProps {
  filter: FilterBarOptions;
  setFilter: Dispatch<SetStateAction<FilterBarOptions>>;
}

const roomOptions: Option[] = [
  { label: 'All' },
  { value: 0, label: 'Studio' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3 or more' },
];

export const FilterBar = ({ filter, setFilter }: FilterBarProps) => (
  <FilterBarWrapper>
    <StyledFormControl sx={{ flex: 1 }}>
      <InputLabel>Rooms</InputLabel>
      <Select
        value={filter.rooms}
        onChange={(e) => setFilter((prev) => ({ ...prev, rooms: Number(e.target.value) }))}
        label="Rooms"
      >
        {roomOptions.map((roomOption) => (
          <MenuItem key={roomOption.value} value={roomOption.value}>
            {roomOption.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>

    <StyledFormControl sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <InputLabel>Price</InputLabel>
      <IconButton
        size="small"
        onClick={() => setFilter((prev) => ({ ...prev, priceAsc: !prev.priceAsc }))}
        sx={{
          border: '1px solid #ccc',
          borderRadius: 1,
          padding: '4px',
          '&:hover': { backgroundColor: 'transparent' },
        }}
      >
        {filter.priceAsc ? (
          <ArrowUpwardIcon fontSize="small" />
        ) : (
          <ArrowDownwardIcon fontSize="small" />
        )}
      </IconButton>
    </StyledFormControl>
  </FilterBarWrapper>
);
