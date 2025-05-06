import React, { useCallback, useEffect, useState } from 'react';
import { getAllHouses } from '@/api/house';
import { House } from '@/types';
import { FilterBar, FilterBarOptions } from '@/components/FilterBar/FilterBar';
import { MAX_ROOMS_FILTER } from '@/constants';
import { Alert, CardContent, Grid } from '@mui/material';
import { CardTitle, InfoText, StyledCard, StyledGrid } from '@/styles/global';
import Spinner from '@/components/Spinner/Spinner';

const roomFilter = (house: House, rooms: number): boolean =>
  rooms === MAX_ROOMS_FILTER ? house.numRooms >= rooms : house.numRooms === rooms;

export const HouseList = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [filter, setFilter] = useState<FilterBarOptions>({ priceAsc: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { rooms: roomsSelected, priceAsc } = filter;

  const fetchHouses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let { houses: fetchedHouses } = await getAllHouses();

      if (roomsSelected !== undefined) {
        fetchedHouses = fetchedHouses.filter((house) => roomFilter(house, roomsSelected));
      }

      fetchedHouses = fetchedHouses.sort((a, b) =>
        priceAsc ? a.price - b.price : b.price - a.price
      );

      setHouses(fetchedHouses);
    } catch (error) {
      console.error('Error fetching houses:', error);
      setError('Failed to fetch houses. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [priceAsc, roomsSelected]);

  useEffect(() => {
    fetchHouses();
  }, [filter, fetchHouses]);

  return (
    <>
      <FilterBar filter={filter} setFilter={setFilter} />

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : loading ? (
        <Spinner />
      ) : (
        <StyledGrid container spacing={2}>
          {houses.map((house) => (
            <Grid key={house.id}>
              <StyledCard>
                <CardContent>
                  <CardTitle variant="h6">House #{house.id}</CardTitle>
                  <InfoText>Address: {house.address}</InfoText>
                  <InfoText>Rooms: {house.numRooms}</InfoText>
                  <InfoText>Price: £{house.price}</InfoText>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </StyledGrid>
      )}
    </>
  );
};
