import React, { useState } from 'react';
import { getUserDetails } from '@/api/user';
import { ApiError, User } from '@/types';
import { CardContent, Grid, TextField, Button } from '@mui/material';
import { CardTitle, InfoText, StyledBox, StyledCard, StyledGrid } from '@/styles/global';
import Spinner from '@/components/Spinner/Spinner';

export default function UserDetails() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchUserDetails = async (id: number) => {
    setError(undefined);

    if (Number(userId) <= 0) {
      setError('The ID must be larger than 0');
      return;
    }

    setLoading(true);
    try {
      const { user: fetchedUser } = await getUserDetails(id);
      setUser(fetchedUser);
      setUserId(undefined);
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError('Failed to fetch user details. Please try again later.');
      }

      setUser(undefined);
      setUserId(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!userId) {
      setError('Please enter a valid user ID');
      return;
    }
    fetchUserDetails(Number(userId));
  };

  return (
    <>
      <StyledBox>
        <TextField
          label="Enter User ID"
          variant="outlined"
          value={userId ?? ''}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
          type="number"
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Fetch User Details
        </Button>
      </StyledBox>

      {loading ? (
        <Spinner />
      ) : user ? (
        <StyledGrid container spacing={2}>
          <Grid>
            <StyledCard>
              <CardContent>
                <CardTitle variant="h6">User Details - #{user.id}</CardTitle>
                <InfoText>Username: {user.username}</InfoText>
                <InfoText>Role: {user.role}</InfoText>
              </CardContent>
            </StyledCard>
          </Grid>
        </StyledGrid>
      ) : null}
    </>
  );
}
