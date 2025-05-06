import React, { useState } from 'react';
import { Button, Box, TextField, Typography, Alert } from '@mui/material';
import { handleCreateHouse } from '@/api/house';
import { ApiError } from '@/types';
import Spinner from '@/components/Spinner/Spinner';

export default function CreateHouseForm() {
  const [address, setAddress] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [created, setCreated] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setError('');
    setCreated(undefined);

    if (!address || !numRooms || !price) {
      setError('All fields are required');
      return;
    }

    const numRoomsValue = Number(numRooms);
    const priceValue = Number(price);

    if (numRoomsValue < 0 || priceValue < 0) {
      setError('Rooms and price must be positive numbers');
      return;
    }

    setLoading(true);
    try {
      const resOk = await handleCreateHouse({
        address,
        numRooms: numRoomsValue,
        price: priceValue,
      });
      setCreated(resOk);
      setAddress('');
      setNumRooms('');
      setPrice('');
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 400) {
        setError(error.message);
      } else {
        setError('Failed to create the property. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const addressError = !!error && !address;
  const numRoomsError = !!error && !numRooms;
  const priceError = !!error && !price;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      maxWidth={400}
      mx="auto"
      mt="12px"
    >
      <Typography variant="h6" textAlign="center">
        Create New House
      </Typography>

      <TextField
        label="Address"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        error={addressError}
        helperText={addressError && 'Address is required'}
      />

      <TextField
        label="Number of Rooms"
        variant="outlined"
        type="number"
        value={numRooms}
        onChange={(e) => setNumRooms(e.target.value)}
        fullWidth
        error={numRoomsError}
        helperText={numRoomsError && 'Number of rooms is required'}
      />

      <TextField
        label="Price"
        variant="outlined"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        error={priceError}
        helperText={priceError && 'Price is required'}
      />

      {loading ? (
        <Spinner />
      ) : (
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Create House
        </Button>
      )}
      {created && <Alert severity="success">{created}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
