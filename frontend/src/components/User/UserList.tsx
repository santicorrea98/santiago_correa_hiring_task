import React, { useCallback, useEffect, useState } from 'react';
import { getAllUsers } from '@/api/user';
import { ApiError, User } from '@/types';
import { Alert, CardContent, Grid } from '@mui/material';
import { CardTitle, InfoText, StyledCard, StyledGrid } from '@/styles/global';
import Spinner from '@/components/Spinner/Spinner';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHouses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { users } = await getAllUsers();

      setUsers(users);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch houses. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  return (
    <>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : loading ? (
        <Spinner />
      ) : (
        <StyledGrid container spacing={2}>
          {users.map((user) => (
            <Grid key={user.id}>
              <StyledCard>
                <CardContent>
                  <CardTitle variant="h6">User #{user.id}</CardTitle>
                  <InfoText>Username: {user.username}</InfoText>
                  <InfoText>Role: {user.role}</InfoText>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </StyledGrid>
      )}
    </>
  );
}
