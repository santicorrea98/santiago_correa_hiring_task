import { ALL_ROLES, MAP_USER_ROLE_OPTION } from '@/constants';
import { StyledFormControl } from '@/styles/global';
import { UserRole } from '@/types';
import { InputLabel, Select, MenuItem } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface LoginFormType {
  role: UserRole | '';
  setRole: Dispatch<SetStateAction<UserRole | ''>>;
}

export default function LoginFrom({ role, setRole }: LoginFormType) {
  return (
    <StyledFormControl fullWidth>
      <InputLabel id="role-select-label">Select Role</InputLabel>
      <Select
        labelId="role-select-label"
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        label="Select Role"
      >
        {ALL_ROLES.map((role) => (
          <MenuItem key={role} value={role}>
            {MAP_USER_ROLE_OPTION[role]}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
}
