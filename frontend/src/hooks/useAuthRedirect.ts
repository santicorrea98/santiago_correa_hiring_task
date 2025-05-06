import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function useAuthRedirect() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [role, setRole] = useState('');

  useEffect(() => {
    const check = async () => {
      const res = await fetch('/api/session');
      const session = await res.json();

      setRole(session ? session.role : '');

      if (!session) {
        router.replace('/');
      }

      const onHome = router.pathname === '/';
      const onDashboard = router.pathname === '/dashboard';

      if (onHome && session.token) {
        router.replace('/dashboard');
      } else if (onDashboard && !session.token) {
        router.replace('/');
      } else {
        setCheckingAuth(false);
      }
    };

    check();
  }, [router]);

  return { checkingAuth, role };
}
