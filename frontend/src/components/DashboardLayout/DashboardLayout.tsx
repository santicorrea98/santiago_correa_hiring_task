import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Action } from '@/types';
import {
  ALL_ACTIONS,
  CREATE_PROPERTY,
  LIST_PROPERTIES,
  LIST_USERS,
  PROPERTY_DETAILS,
  USER_DETAIL,
} from '@/constants';
import HouseList from '@/components/House/HouseList';
import { StyledBox, StyledFormControl, Title, Wrapper } from '@/styles/global';
import HouseDetails from '@/components/House/HouseDetails';
import CreateHouseForm from '@/components/House/CreateHouseForm';
import UserList from '@/components/User/UserList';
import UserDetails from '@/components/User/UserDetails';

interface DashboardLayoutProps {
  isAdmin: boolean;
}

export default function DashboardLayout({ isAdmin }: DashboardLayoutProps) {
  const [action, setAction] = useState<Action | ''>('');

  const handleActionChange = (event: SelectChangeEvent<unknown>) => {
    setAction(event.target.value as Action);
  };

  const renderComponent = () => {
    switch (action) {
      case LIST_PROPERTIES:
        return <HouseList />;
      case PROPERTY_DETAILS:
        return <HouseDetails />;
      case CREATE_PROPERTY:
        return <CreateHouseForm />;
      case LIST_USERS:
        return <UserList />;
      case USER_DETAIL:
        return <UserDetails />;
      // case CREATE_USER:
      //   return <CreateUserForm />;
      default:
        return <></>;
    }
  };

  const actionOptions = ALL_ACTIONS.filter((actionOption) => isAdmin || !actionOption.isAdminOnly);

  return (
    <Wrapper sx={{ flexDirection: 'column' }}>
      <StyledBox>
        <Title variant="h5">{isAdmin ? 'Admin' : 'Agent'} dashboard</Title>
        <StyledFormControl fullWidth>
          <InputLabel id="action-select-label">Select Action</InputLabel>
          <Select
            labelId="action-select-label"
            value={action}
            onChange={handleActionChange}
            label="Select Action"
          >
            {actionOptions.map((action) => (
              <MenuItem key={action.key} value={action.key}>
                {action.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        {renderComponent()}
      </StyledBox>
    </Wrapper>
  );
}
