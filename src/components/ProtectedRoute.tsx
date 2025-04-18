import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';

export default function ProtectedRoute() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Carregando...</div>; // Ou um spinner
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}