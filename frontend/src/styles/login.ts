/** @jsxImportSource @emotion/react */
import { styled } from '@mui/material/styles';
import { Box, FormControl } from '@mui/material';

export const LoginWrapper = styled('div')(({}) => ({
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  boxSizing: 'border-box',
}));

export const LoginBox = styled(Box)(({}) => ({
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '2px',
  width: '100%',
  maxWidth: 400,
  textAlign: 'center',
}));

export const LoginFormControl = styled(FormControl)(({}) => ({
  marginBottom: '6px',
  textAlign: 'left',
}));
