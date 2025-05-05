import React, { useCallback, useEffect, useState } from 'react';
import { getAllHouses } from '@/api/house';
import { House } from '@/types';
import { FilterBar, FilterBarOptions } from '@/components/FilterBar/FilterBar';
import { MAX_PRICE_FILTER, MAX_ROOMS_FILTER } from '@/constants';
import { Alert, CardContent, Grid } from '@mui/material';
import { CardTitle, InfoText, StyledCard, StyledGrid } from '@/styles/global';
import Spinner from '@/components/Spinner/Spinner';

const roomFilter = (house: House, rooms: number): boolean =>
  rooms === MAX_ROOMS_FILTER ? house.num_rooms >= rooms : house.num_rooms === rooms;

const priceFilter = (house: House, price: number): boolean =>
  price === MAX_PRICE_FILTER ? house.price >= price : house.price < price;

export const HouseList = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [filter, setFilter] = useState<FilterBarOptions>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { rooms: roomsSelected, price: priceSelected } = filter;

  const fetchHouses = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      let { houses: fetchedHouses } = await getAllHouses();

      if (roomsSelected) {
        fetchedHouses = fetchedHouses.filter((house) => roomFilter(house, roomsSelected));
      }

      if (priceSelected) {
        fetchedHouses = fetchedHouses.filter((house) => priceFilter(house, priceSelected));
      }

      setHouses(fetchedHouses);
    } catch (error) {
      console.error('Error fetching houses:', error);
      setError('Failed to fetch houses. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [roomsSelected, priceSelected]);

  useEffect(() => {
    fetchHouses();
  }, [filter, fetchHouses]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <FilterBar filter={filter} setFilter={setFilter} />

      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <StyledGrid container spacing={2}>
          {houses.map((house) => (
            <Grid key={house.id}>
              <StyledCard>
                <CardContent>
                  <CardTitle variant="h6">House #{house.id}</CardTitle>
                  <InfoText>Address: {house.address}</InfoText>
                  <InfoText>Rooms: {house.num_rooms}</InfoText>
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
