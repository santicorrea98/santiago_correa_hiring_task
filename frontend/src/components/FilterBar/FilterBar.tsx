import React, { Dispatch, SetStateAction } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { FilterBarWrapper } from './FilterBar.styles';
import { StyledFormControl } from '@/styles/global';

export interface FilterBarOptions {
  rooms?: number;
  price?: number;
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

const priceOptions: Option[] = [
  { label: 'All' },
  { value: 100, label: 'Less than £100' },
  { value: 200, label: 'Less than £200' },
  { value: 300, label: 'Less than £300' },
  { value: 400, label: '£400 or more' },
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

    <StyledFormControl sx={{ flex: 1 }}>
      <InputLabel>Price</InputLabel>
      <Select
        value={filter.price}
        onChange={(e) => setFilter((prev) => ({ ...prev, price: Number(e.target.value) }))}
        label="Price"
      >
        {priceOptions.map((priceOption) => (
          <MenuItem key={priceOption.value} value={priceOption.value}>
            {priceOption.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  </FilterBarWrapper>
);
