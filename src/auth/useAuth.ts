import { useState } from 'react';
import api from '../api/client';

interface Credentials {
  email: string;
  password: string;
}

export function useAuth() {
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: Credentials) => {
    try {
      const response = await api.post('/api/login', {
        credentials,
      });

      const token = response.data.token;
      localStorage.setItem('jwt', token);
      setError(null);
      return true;
    } catch (err) {
      setError(`Login inválido ${err}`);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
  };

  return { login, logout, error };
}
