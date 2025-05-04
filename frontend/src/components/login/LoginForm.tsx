import { MAP_USER_ROLE_OPTION } from '@/constants';
import { LoginFormControl } from '@/styles/login';
import { UserRole, userRoles } from '@/types';
import { InputLabel, Select, MenuItem } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface LoginFormType {
  role: UserRole | '';
  setRole: Dispatch<SetStateAction<UserRole | ''>>;
}

export default function LoginFrom({ role, setRole }: LoginFormType) {
  return (
    <LoginFormControl fullWidth>
      <InputLabel id="role-select-label">Select Role</InputLabel>
      <Select
        labelId="role-select-label"
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        label="Select Role"
      >
        {userRoles.map((userRole) => (
          <MenuItem key={userRole} value={userRole}>
            {MAP_USER_ROLE_OPTION[userRole]}
          </MenuItem>
        ))}
      </Select>
    </LoginFormControl>
  );
}
