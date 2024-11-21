import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../estudiantes/navbar';
import Footer from '../estudiantes/footer';

const DynamicTopicPage = () => {
  const { topicName } = useParams();
  const [topic, setTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    name: '',
    date: '',
    link: '',
    type: 'pdf',
    description: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    const selectedTopic = savedFiles.find(
      (file) => file.name.replace(/\s+/g, '-').toLowerCase() === topicName
    );
    setTopic(selectedTopic || { name: topicName, resources: [] });
  }, [topicName]);

  const handleAddResource = () => {
    if (!newResource.name || !newResource.date || !newResource.link || !newResource.type) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    if (!dateRegex.test(newResource.date)) {
      setError('El formato de la fecha debe ser YYYY-MM-DD.');
      return;
    }

    const resource = { ...newResource };
    const updatedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    const updatedTopic = {
      ...topic,
      resources: [...(topic.resources || []), resource],
    };

    const newAllFiles = updatedFiles.map((file) =>
      file.name.replace(/\s+/g, '-').toLowerCase() === topicName ? updatedTopic : file
    );

    if (!updatedFiles.some((file) => file.name.replace(/\s+/g, '-').toLowerCase() === topicName)) {
      newAllFiles.push(updatedTopic);
    }

    localStorage.setItem('allFiles', JSON.stringify(newAllFiles));
    setTopic(updatedTopic);
    setNewResource({ name: '', date: '', link: '', type: 'pdf', description: '', image: '' });
    setError('');
    setSuccessMessage('Recurso agregado exitosamente.');
    setIsModalOpen(false);

    setTimeout(() => setSuccessMessage(''), 3000); // Limpiar mensaje después de 3 segundos
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewResource({ name: '', date: '', link: '', type: 'pdf', description: '', image: '' });
    setError('');
  };

  if (!topic) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="bg-white shadow p-4 mb-6 text-center">
        <h1 className="text-2xl font-bold">{topic.name}</h1>
        {topic.description && <p className="text-gray-600">{topic.description}</p>}
        {topic.image && <img src={topic.image} alt={topic.name} className="mx-auto mt-4 w-1/2" />}
      </div>

      <div className="container mx-auto px-4 mb-20 bg-white-100 p-10  rounded">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-6"
          onClick={() => setIsModalOpen(true)}
        >
          Agregar Nuevo Recurso
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-1/3 p-6 rounded ">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Agregar Nuevo Recurso</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleCancel}
                >
                  ×
                </button>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre del Recurso"
                  value={newResource.name}
                  onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="date"
                  placeholder="Fecha (YYYY-MM-DD)"
                  value={newResource.date}
                  onChange={(e) => setNewResource({ ...newResource, date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Enlace"
                  value={newResource.link}
                  onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                  <option value="game">Juego</option>
                </select>
                <textarea
                  placeholder="Descripción del Recurso"
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Imagen (URL opcional)"
                  value={newResource.image}
                  onChange={(e) => setNewResource({ ...newResource, image: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleAddResource}
                  >
                    Agregar Recurso
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500 text-white px-4 py-2 rounded mt-4">
            {successMessage}
          </div>
        )}

        <div className="bg-white shadow mt-6">
          <h3 className="text-lg font-semibold px-4 py-2 border-b">Recursos Disponibles</h3>
          {topic.resources && topic.resources.length > 0 ? (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className=" text-left">
                  <th className="px-4 py-2 border">Nombre</th>
                  <th className="px-4 py-2 border">Tipo</th>
                  <th className="px-4 py-2 border">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {topic.resources.map((resource, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {resource.name}
                      </a>
                    </td>
                    <td className="px-4 py-2 border">{resource.type}</td>
                    <td className="px-4 py-2 border">{resource.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center p-4">No hay recursos disponibles para este tema.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default DynamicTopicPage;
