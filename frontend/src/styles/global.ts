import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { Box, Card, FormControl, Grid, Typography } from '@mui/material';

export const globalStyles = css`
  html,
  body,
  #__next {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background: linear-gradient(to right, black, blue, blue, blue, black);
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

export const Title = styled(Typography)(({}) => ({
  marginBottom: '12px',
  fontWeight: 600,
  color: 'black',
}));

export const Wrapper = styled('div')(({}) => ({
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

export const StyledBox = styled(Box)(({}) => ({
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '2px',
  width: '90%',
  maxWidth: 400,
  textAlign: 'center',
}));

export const StyledFormControl = styled(FormControl)(({}) => ({
  marginBottom: '6px',
  textAlign: 'left',
}));

export const StyledGrid = styled(Grid)(({}) => ({
  marginTop: '2px',
  maxHeight: '500px',
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '4px',
}));

export const StyledCard = styled(Card)(({}) => ({
  minWidth: 275,
  backgroundColor: '#fff',
  boxShadow: '4px',
  borderRadius: '6px',
}));

export const CardTitle = styled(Typography)(({}) => ({
  fontWeight: 600,
  marginBottom: '2px',
}));

export const InfoText = styled(Typography)(({}) => ({
  fontSize: 14,
  color: 'grey',
}));
