import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';

export default function Header() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <nav className="flex items-center gap-6">
        <Link to="/projects" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
          Projetos
        </Link>
        <Link to="/projects/new" className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          + Novo Projeto
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{user.email}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
