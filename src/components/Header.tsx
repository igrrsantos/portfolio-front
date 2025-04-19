import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';

export default function Header() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-700">
          Portfólio
        </Link>

        <nav className="flex gap-4 items-center text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-indigo-600">Início</Link>
          <Link to="/projects" className="hover:text-indigo-600">Projetos</Link>
          {user ? (
            <>
              <Link to="/projects/new" className="hover:text-indigo-600">Novo Projeto</Link>
              <button onClick={handleLogout} className="hover:text-red-600">Sair</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-indigo-600">Entrar</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
