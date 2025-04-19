import { useEffect, useState } from 'react';
import api from '../api/client';
import { Link } from 'react-router-dom';

type Project = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  tech_tags?: string[];
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Erro ao carregar projetos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <main className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Meus Projetos</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : projects.length === 0 ? (
          <p>Nenhum projeto cadastrado ainda.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link to={`/projects/${project.id}`}>
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                >
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech_tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-emerald-100 text-emerald-700 text-sm px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
