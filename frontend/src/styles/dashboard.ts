/** @jsxImportSource @emotion/react */
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DashboardContainer = styled(Paper)(({}) => ({
  minHeight: '80%',
  width: '80%',
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  justifySelf: 'center',
  paddingTop: '12px',
  backgroundColor: '#fff',
  borderRadius: '6px',
}));

export const DashboardSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(2),
}));
