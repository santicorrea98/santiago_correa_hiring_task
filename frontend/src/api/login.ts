import { UserRole } from '@/types';

export const handleLogin = async (role: UserRole): Promise<void> => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });

    const { token } = await res.json();
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
  } catch {
    throw new Error('Unexpected error during login');
  }
};
