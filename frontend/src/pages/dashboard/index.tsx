import React from 'react';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import Spinner from '@/components/Spinner/Spinner';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { Wrapper } from '@/styles/global';

export default function Dashboard() {
  const { checkingAuth } = useAuthRedirect();

  if (checkingAuth) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  const role = localStorage.getItem('role');

  return <DashboardLayout isAdmin={role === 'admin'} />;
}
