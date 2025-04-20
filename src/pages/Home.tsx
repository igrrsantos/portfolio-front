// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import {
  SiRubyonrails,
  SiReact,
  SiPostgresql,
  SiTailwindcss,
  SiJsonwebtokens,
  SiRedis
} from 'react-icons/si';
import { useEffect, useState } from 'react';
import api from '../api/client';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

type Project = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  tech_tags: string[];
};

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
  });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (projects.length > 0) {
      setLoaded(true);
    }
  }, [projects]);

  useEffect(() => {
    api.get('/api/public/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Erro ao carregar projetos', err));
  }, []);

  useEffect(() => {
    if (!slider.current || projects.length === 0) return;

    const interval = setInterval(() => {
      slider.current?.next();
    }, 4000);

    return () => clearInterval(interval);
  }, [slider, projects]);

  return (
    <div className="text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfólio Técnico</h1>
        <p className="text-xl md:text-2xl max-w-xl mx-auto">
          Desenvolvimento de APIs modernas com Ruby on Rails e front-end em React.
        </p>
        <Link
          to="/projects"
          className="mt-8 inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Ver Projetos
        </Link>
      </section>

      {/* SOBRE */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <p className="text-lg text-gray-600">
          Sou um desenvolvedor com foco em back-end, apaixonado por resolver problemas com código limpo, APIs bem estruturadas e integração entre sistemas.
        </p>
      </section>

      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">Projetos em Destaque</h2>
        </div>

        {loaded && (
          <div ref={sliderRef} className="keen-slider">
            {projects.map((project) => (
              <div
                key={project.id}
                className="keen-slider__slide bg-white rounded-lg shadow-md hover:shadow-xl transition p-4"
              >
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <h2 className="text-xl font-semibold mt-4">{project.title}</h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {project.description}
                </p>

                {project.tech_tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech_tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* STACK */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Tecnologias que uso</h2>
        <div className="flex flex-wrap justify-center gap-6 text-white">
          <span className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded">
            <SiRubyonrails /> Rails
          </span>
          <span className="flex items-center gap-2 bg-sky-500 px-4 py-2 rounded">
            <SiReact /> React
          </span>
          <span className="flex items-center gap-2 bg-yellow-600 px-4 py-2 rounded">
            <SiJsonwebtokens /> JWT
          </span>
          <span className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded">
            <SiPostgresql /> PostgreSQL
          </span>
          <span className="flex items-center gap-2 bg-cyan-600 px-4 py-2 rounded">
            <SiTailwindcss /> Tailwind
          </span>
          <span className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded">
            <SiRedis /> Redis
          </span>
        </div>
      </section>
    </div>
  );
}
