/** @jsxImportSource @emotion/react */
import React, { JSX, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Title } from '@/styles/global';
import { ALL_ACTIONS } from '@/constants';
import { DashboardContainer, DashboardSection } from '@/styles/dashboard';

interface DashboardLayoutProps {
  isAdmin?: boolean;
}

function DashboardLayout({ isAdmin = false }: DashboardLayoutProps): JSX.Element {
  const [activeAction, setActiveAction] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const availableActions = ALL_ACTIONS.filter((action) => isAdmin || !action.isAdminOnly);

  const selectedAction = activeAction ? ALL_ACTIONS[activeAction] : undefined;

  const handleAction = async () => {
    setError(undefined);
    try {
      // call depending on the action chosen
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <DashboardContainer elevation={3}>
      <Title>{isAdmin ? 'Admin dashboard' : 'Agent dashboard'}</Title>
      <FormControl size="small" sx={{ minWidth: 240, marginTop: '12px' }}>
        <InputLabel id="action-select-label">Select Action</InputLabel>
        <Select
          labelId="action-select-label"
          id="action-select"
          value={activeAction}
          label="Select Action"
          onChange={(e) => setActiveAction(Number(e.target.value))}
        >
          {availableActions.map((action, idx) => (
            <MenuItem key={action.key} value={idx}>
              {action.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {activeAction && (
        <DashboardSection>
          <Typography variant="h6" gutterBottom>
            {selectedAction!.label}
          </Typography>

          {/* Depending on the action, what fields or no fields */}

          <Button variant="contained" onClick={handleAction}>
            Activate
          </Button>

          {/* Depending on the action, what to show */}

          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </DashboardSection>
      )}
    </DashboardContainer>
  );
}

export default DashboardLayout;
