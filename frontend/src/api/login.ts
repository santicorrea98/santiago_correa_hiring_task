import { UserRole } from '@/types';

export const handleLogin = async (role: UserRole): Promise<void> => {
  try {
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
  } catch {
    throw new Error('Unexpected error during login');
  }
};
