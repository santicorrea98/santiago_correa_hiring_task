import React from 'react';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import Spinner from '@/components/Spinner/Spinner';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';

export default function Dashboard() {
  const { checkingAuth } = useAuthRedirect();

  if (checkingAuth) {
    return <Spinner />;
  }

  const role = localStorage.getItem('role');

  return <DashboardLayout isAdmin={role === 'admin'} />;
}
