import React from 'react';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { Container, Typography } from '@mui/material';
import Spinner from '@/components/spinner';

export default function Dashboard() {
  const { checkingAuth } = useAuthRedirect();

  if (checkingAuth) {
    return <Spinner />;
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4">Welcome to the Dashboard</Typography>
    </Container>
  );
}
