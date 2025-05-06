import React, { useState } from 'react';
import { Button, Box, TextField, Typography, Alert } from '@mui/material';
import { handleCreateUser } from '@/api/user';
import { ApiError, UserRole } from '@/types';
import Spinner from '@/components/Spinner/Spinner';
import { ALL_ROLES } from '@/constants';

export default function CreateUserForm() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [created, setCreated] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setError('');
    setCreated(undefined);

    if (!username || !role) {
      setError('All fields are required');
      return;
    }

    if (!ALL_ROLES.includes(role as UserRole)) {
      setError(`The role must be one of the following: ${ALL_ROLES.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const resOk = await handleCreateUser({
        username,
        role,
      });
      setCreated(resOk);
      setUsername('');
      setRole('');
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 400) {
        setError(error.message);
      } else {
        setError('Failed to create the property. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const usernameError = !!error && !username;
  const roleError = !!error && !role;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      maxWidth={400}
      mx="auto"
      mt="12px"
    >
      <Typography variant="h6" textAlign="center">
        Create New User
      </Typography>

      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        error={usernameError}
        helperText={usernameError && 'Username is required'}
      />

      <TextField
        label="Role"
        variant="outlined"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        error={roleError}
        helperText={roleError && 'Role is required'}
      />

      {loading ? (
        <Spinner />
      ) : (
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Create User
        </Button>
      )}
      {created && <Alert severity="success">{created}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
