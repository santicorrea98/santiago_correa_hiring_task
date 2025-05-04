import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Alert } from '@mui/material';
import { handleLogin } from '@/api/login';
import { UserRole } from '@/types';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import Spinner from '@/components/spinner/Spinner';
import LoginFrom from '@/components/login/LoginForm';
import { Title } from '@/styles/global';
import { LoginWrapper, LoginBox } from '@/styles/login';

export default function Home() {
  const [role, setRole] = useState<UserRole | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { checkingAuth } = useAuthRedirect();

  const router = useRouter();

  const onLogin = async () => {
    if (!role) {
      setError('Please select a role.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await handleLogin(role);
      router.push('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <Spinner />;
  }

  return (
    <LoginWrapper>
      <LoginBox>
        <Title variant="h5">Login</Title>

        <LoginFrom role={role} setRole={setRole} />

        <Button variant="contained" color="primary" onClick={onLogin} disabled={loading} fullWidth>
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </LoginBox>
    </LoginWrapper>
  );
}
