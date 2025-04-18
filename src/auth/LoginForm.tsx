import { useState } from 'react';
import api from '../api/client';
import { useAuthContext } from './AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/login', { email, password });
      const { token, user } = response.data;

      setAuth(user, token);
      navigate(location.state?.from || '/projects', { replace: true });
    } catch (err: unknown) {
      // aqui você precisa fazer cast se quiser acessar propriedades específicas
      const error = err as { message?: string };
      console.error(error.message || err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Acessar Portfólio
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
        <p className="text-center mt-4">
          Não tem conta? <Link to="/signup" className="text-blue-600">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}