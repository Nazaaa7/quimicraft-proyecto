import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaFilePdf, FaYoutube, FaGamepad, FaFileAlt } from 'react-icons/fa';
import Navbar from './navbar';
import Footer from './footer';
import OrganicCompoundConcept from './OrganicCompoundConcept';
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

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || []   ;
    const selectedTopic = savedFiles.find(
      (file) => file.name.replace(/\s+/g, '-').toLowerCase() === topicName
    );
    setTopic(selectedTopic);
  }, [topicName]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewResource({ name: '', date: '', link: '', type: 'pdf', description: '', image: '' });
    setError('');
  };

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
    setIsModalOpen(false);
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

      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>
        Agregar Nuevo Recurso
      </button>

      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-container">
          <div className="modal-header">
            <h3 className="modal-title">Agregar Nuevo Recurso</h3>
            <button className="modal-close" onClick={handleCancel}>×</button>
          </div>
          
          <form className="modal-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre del Recurso"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Fecha"
                value={newResource.date}
                onChange={(e) => setNewResource({ ...newResource, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Enlace"
                value={newResource.link}
                onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
              />
            </div>

            <div className="form-group">
              <select
                value={newResource.type}
                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
              >
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="game">Juego</option>
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <div className="button-container">
              <button type="button" className="submit-button" onClick={handleAddResource}>
                Agregar Recurso
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DynamicTopicPage;