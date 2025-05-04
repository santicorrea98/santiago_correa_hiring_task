import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function useAuthRedirect() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const onHome = router.pathname === '/';
    const onDashboard = router.pathname === '/dashboard';

    if (onHome && token) {
      router.replace('/dashboard');
    } else if (onDashboard && !token) {
      router.replace('/');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  return { checkingAuth };
}
