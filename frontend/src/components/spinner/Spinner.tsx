import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function Spinner() {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
}
