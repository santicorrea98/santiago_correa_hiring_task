import React, { useState } from 'react';
import { getHouseDetails } from '@/api/house';
import { ApiError, House } from '@/types';
import { CardContent, Grid, TextField, Button } from '@mui/material';
import { CardTitle, InfoText, StyledBox, StyledCard, StyledGrid } from '@/styles/global';
import Spinner from '@/components/Spinner/Spinner';

export default function HouseDetails() {
  const [houseId, setHouseId] = useState<string | undefined>(undefined);
  const [house, setHouse] = useState<House | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchHouseDetails = async (id: number) => {
    setError(undefined);

    if (Number(houseId) <= 0) {
      setError('The ID must be larger than 0');
      return;
    }

    setLoading(true);
    try {
      const { house: fetchedHouse } = await getHouseDetails(id);
      setHouse(fetchedHouse);
      setHouseId(undefined);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        setError(error.message);
      } else {
        setError('Failed to fetch house details. Please try again later.');
      }

      setHouse(undefined);
      setHouseId(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!houseId) {
      setError('Please enter a valid house ID');
      return;
    }
    fetchHouseDetails(Number(houseId));
  };

  return (
    <>
      <StyledBox>
        <TextField
          label="Enter House ID"
          variant="outlined"
          value={houseId ?? ''}
          onChange={(e) => setHouseId(e.target.value)}
          fullWidth
          type="number"
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Fetch House Details
        </Button>
      </StyledBox>

      {loading ? (
        <Spinner />
      ) : house ? (
        <StyledGrid container spacing={2}>
          <Grid>
            <StyledCard>
              <CardContent>
                <CardTitle variant="h6">House Details - #{house.id}</CardTitle>
                <InfoText>Address: {house.address}</InfoText>
                <InfoText>Rooms: {house.numRooms}</InfoText>
                <InfoText>Price: £{house.price}</InfoText>
              </CardContent>
            </StyledCard>
          </Grid>
        </StyledGrid>
      ) : null}
    </>
  );
}
