import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';

type TechTag = {
  id: number;
  name: string;
};

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  const [availableTags, setAvailableTags] = useState<TechTag[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/api/projects/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setSelectedTags(data.tech_tags || []);
        if (data.image_url) setImagePreview(data.image_url);
      } catch (err) {
        setError(`Erro ao carregar projeto ${err}`);
      }
    };

    const fetchTags = async () => {
      try {
        const { data } = await api.get('/api/tech_tags');
        setAvailableTags(data);
      } catch (err) {
        console.error('Erro ao carregar tech tags', err);
      }
    };

    fetchTags();
    fetchProject();
  }, [id]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('project[title]', title);
    formData.append('project[description]', description);
    selectedTags.forEach((tag) => {
      formData.append('project[tech_tags][]', tag);
    });
    if (image) formData.append('project[image]', image);

    try {
      await api.put(`/api/projects/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/projects/${id}`);
    } catch (err) {
      setError(`Erro ao atualizar projeto ${err}`);
    }
  };

  return (
    <>
      <main className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Editar Projeto</h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tecnologias</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <label
                  key={tag.id}
                  className={`cursor-pointer px-3 py-1 rounded-full border ${
                    selectedTags.includes(tag.name)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={tag.name}
                    checked={selectedTags.includes(tag.name)}
                    onChange={() => handleTagChange(tag.name)}
                    className="hidden"
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded border w-full max-h-64 object-contain"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Atualizar Projeto
          </button>
        </form>
      </main>
    </>
  );
}
