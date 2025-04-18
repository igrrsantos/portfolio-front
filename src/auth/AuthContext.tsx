import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

type User = {
  id: number;
  email: string;
  name?: string; // Adicione outros campos conforme necessário
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setAuth: () => {},
  logout: () => {},
  isAuthenticated: false,
  isLoading: false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Novo estado

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('jwt');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          // Agora o token será enviado automaticamente pelo interceptor
          await api.get('/api/validate_token');

          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          console.error('Token inválido ou expirado', error);
          logout();
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  const setAuth = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout, isAuthenticated, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);