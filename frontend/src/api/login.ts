import { UserRole } from '@/types';
import axios from 'axios';

interface LoginResponse {
  token: string;
}

export const handleLogin = async (role: UserRole): Promise<void> => {
  try {
    const res = await axios.post<LoginResponse>('/api/login', {
      role,
    });

    const token = res.data.token;
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || 'Login request failed');
    }

    throw new Error('Unexpected error during login');
  }
};
