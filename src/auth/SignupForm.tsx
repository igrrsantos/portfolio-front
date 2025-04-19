import { useState } from 'react';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

export default function SignupForm() {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/signup', form);
      const { token, user } = response.data;

      setAuth(user, token);
      navigate('/projects');
    } catch (err: any) {
      setError(err.response?.data?.errors?.[0] || 'Erro ao criar conta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          name="name"
          placeholder="Nome"
          className="w-full p-2 mb-4 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          className="w-full p-2 mb-4 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          className="w-full p-2 mb-4 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="password_confirmation"
          placeholder="Confirme a senha"
          type="password"
          className="w-full p-2 mb-4 border rounded"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
