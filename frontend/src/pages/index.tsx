import React from 'react';

import { useState } from 'react';
import {
  Container,
  Typography,
  MenuItem,
  Select,
  Button,
  Box,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';
import { handleLogin } from '@/api/login';
import { UserRole, userRoles } from '@/types';
import { MAP_USER_ROLE_OPTION } from '@/constants';

export default function Home() {
  const [role, setRole] = useState<UserRole | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onLogin = async () => {
    if (!role) {
      setError('Please select a role.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await handleLogin(role);
      alert(`Logged in as ${role}`);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
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
      </FormControl>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box textAlign="center">
        <Button variant="contained" onClick={onLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Container>
  );
}
