import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const FilterBarWrapper = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  flexWrap: 'nowrap',
  marginBottom: '4px',
}));
