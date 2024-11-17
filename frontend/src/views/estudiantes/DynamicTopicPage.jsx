// DynamicTopicPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import OrganicCompoundConcept from './OrganicCompoundConcept';
import './assets/css/OrganicCompoundConcept.css';
import { FaFilePdf, FaYoutube, FaGamepad, FaFileAlt } from 'react-icons/fa';

const DynamicTopicPage = () => {
  const { topicName } = useParams();
  const [topic, setTopic] = useState(null);
  const [newResource, setNewResource] = useState({
    name: '',
    date: '',
    link: '',
    type: 'pdf',
    description: '',
    image: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    const selectedTopic = savedFiles.find(
      (file) => file.name.replace(/\s+/g, '-').toLowerCase() === topicName
    );
    setTopic(selectedTopic);
  }, [topicName]);

  const handleAddResource = () => {
    if (!newResource.name || !newResource.date || !newResource.link || !newResource.type) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const resource = {
      name: newResource.name,
      date: newResource.date,
      link: newResource.link,
      type: newResource.type,
      description: newResource.description,
      image: newResource.image,
      icon: getIconByType(newResource.type),
    };

    // Actualizar el recurso en localStorage
    const updatedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    const updatedTopic = { 
      ...topic, 
      resources: [...(topic.resources || []), resource] 
    };
    const newAllFiles = updatedFiles.map(file => 
      file.name.replace(/\s+/g, '-').toLowerCase() === topicName ? updatedTopic : file
    );
    localStorage.setItem('allFiles', JSON.stringify(newAllFiles));
    setTopic(updatedTopic);
    setNewResource({ name: '', date: '', link: '', type: 'pdf', description: '', image: '' });
    setError('');
  };

  const getIconByType = (type) => {
    switch(type) {
      case 'pdf': return <FaFilePdf />;
      case 'video': return <FaYoutube />;
      case 'game': return <FaGamepad />;
      default: return <FaFileAlt />;
    }
  };

  if (!topic) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Navbar />
      <OrganicCompoundConcept 
        files={topic.resources || []} 
        topicName={topic.name} 
        description={topic.description} 
        bannerImage={topic.image} 
      />

      {/* Formulario para agregar recursos */}
      <div className="add-resource">
        <h3>Agregar Nuevo Recurso</h3>
        <input
          type="text"
          placeholder="Nombre del Recurso"
          value={newResource.name}
          onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Fecha"
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
        <input
          type="text"
          placeholder="Descripción"
          value={newResource.description}
          onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de la Imagen"
          value={newResource.image}
          onChange={(e) => setNewResource({ ...newResource, image: e.target.value })}
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleAddResource}>Agregar Recurso</button>
      </div>

      <Footer />
    </div>
  );
};

export default DynamicTopicPage;
