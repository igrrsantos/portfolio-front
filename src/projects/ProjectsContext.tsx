import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';
import { useAuthContext } from '../auth/AuthContext';

type Project = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
};

type ProjectsContextType = {
  projects: Project[];
  addProject: (p: Project) => void;
  reloadProjects: () => void;
};

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  addProject: () => {},
  reloadProjects: () => {},
});

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const { token } = useAuthContext();

  const reloadProjects = () => {
    api.get('/api/projects')
      .then((res) => setProjects(res.data.projects || res.data))
      .catch((err) => console.error('Erro ao buscar projetos', err));
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  useEffect(() => {
    if (token) {
      reloadProjects();
    }
  }, [token]);

  return (
    <ProjectsContext.Provider value={{ projects, addProject, reloadProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext);
