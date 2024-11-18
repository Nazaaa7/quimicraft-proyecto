import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../estudiantes/navbar';
import Footer from '../estudiantes/footer';
import './assets/css/OrganicCompoundConcept.css'; 

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
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="topic-banner">
        <h1>{topic.name}</h1>
        {topic.description && <p>{topic.description}</p>}
        {topic.image && <img src={topic.image} alt={topic.name} className="topic-image" />}
      </div>

      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>
        Agregar Nuevo Recurso
      </button>

      {isModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Agregar Nuevo Recurso</h3>
              <button className="modal-close" onClick={handleCancel}>
                ×
              </button>
            </div>
            <form className="modal-form">
              <input
                type="text"
                placeholder="Nombre del Recurso"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              />
              <input
                type="date"
                placeholder="Fecha (YYYY-MM-DD)"
                value={newResource.date}
                onChange={(e) => setNewResource({ ...newResource, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enlace"
                value={newResource.link}
                onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
              />
              <select
                value={newResource.type}
                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
              >
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="game">Juego</option>
              </select>
              <textarea
                placeholder="Descripción del Recurso"
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Imagen (URL opcional)"
                value={newResource.image}
                onChange={(e) => setNewResource({ ...newResource, image: e.target.value })}
              />
              {error && <div className="error-message">{error}</div>}
              <div className="button-container">
                <button type="button" onClick={handleAddResource}>
                  Agregar Recurso
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="all-files">
  <h3 className="text-xl font-semibold mt-6">Recursos Disponibles</h3>
  {topic.resources && topic.resources.length > 0 ? (
    <table className="files-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {topic.resources.map((resource, index) => (
          <tr key={index}>
            <td>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="file-link"
              >
                {resource.name}
              </a>
            </td>
            <td>{resource.type}</td>
            <td>{resource.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No hay recursos disponibles para este tema.</p>
  )}
</div>



      <Footer />
    </div>
  );
};

export default DynamicTopicPage;
