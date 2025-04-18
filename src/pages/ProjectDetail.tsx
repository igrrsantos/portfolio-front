import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import Header from '../components/Header';

type Project = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  tech_tags?: string[];
  created_at?: string;
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    api.get(`/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => navigate('/projects'));
  }, [id, navigate]);

  if (!project) return null;

  const handleDelete = async () => {
    const confirmDelete = confirm('Tem certeza que deseja excluir este projeto?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/projects/${id}`);
      navigate('/projects');
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir projeto');
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-700 mb-4">{project.description}</p>

        {(project.tech_tags ?? []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech_tags!.map((tag, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-400 mb-8">
          Criado em: {new Date(project.created_at || '').toLocaleDateString()}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/projects/${id}/edit`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Editar Projeto
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Excluir Projeto
          </button>
        </div>
      </main>
    </>
  );
}
