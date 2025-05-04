import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

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
