import React from 'react';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import Spinner from '@/components/Spinner/Spinner';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { Wrapper } from '@/styles/global';

export default function Dashboard() {
  const { checkingAuth, role } = useAuthRedirect();

  if (checkingAuth) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  return <DashboardLayout isAdmin={role === 'admin'} />;
}
