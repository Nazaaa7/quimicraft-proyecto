// Project2.jsx
import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import './assets/css/FileDashboard.css';

const Project2 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [newTopic, setNewTopic] = useState({
    name: '',
    date: '',
    link: '',
    description: '',
    image: '',
    resources: [], // Inicializar recursos como un array vacío
  });
  const [isAddTopicVisible, setIsAddTopicVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    setAllFiles(savedFiles);
  }, []);

  const handleAddTopic = () => {
    if (!newTopic.name || !newTopic.date || !newTopic.link || !newTopic.image || !newTopic.description) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const newFile = {
      name: newTopic.name,
      date: newTopic.date,
      link: `/topic/${newTopic.name.replace(/\s+/g, '-').toLowerCase()}`,
      type: 'pdf',
      description: newTopic.description,
      image: newTopic.image,
      resources: [], // Inicializar recursos como un array vacío
    };

    const updatedFiles = [...allFiles, newFile];
    setAllFiles(updatedFiles);
    localStorage.setItem('allFiles', JSON.stringify(updatedFiles));

    window.dispatchEvent(new Event('storage'));

    setNewTopic({ name: '', date: '', link: '', description: '', image: '', resources: [] });
    setError('');
  };

  const filteredFiles = allFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <button
          onClick={() => setIsAddTopicVisible(!isAddTopicVisible)}
          className="toggle-topic-button"
        >
          {isAddTopicVisible ? 'Ocultar Caja de Nuevo Tema' : 'Más Materia'}
        </button>

        {isAddTopicVisible && (
          <div className="add-topic">
            <h3>Agregar Nuevo Tema</h3>
            <input
              type="text"
              placeholder="Nombre del Tema"
              value={newTopic.name}
              onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Fecha"
              value={newTopic.date}
              onChange={(e) => setNewTopic({ ...newTopic, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL de la Imagen"
              value={newTopic.image}
              onChange={(e) => setNewTopic({ ...newTopic, image: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enlace del Tema"
              value={newTopic.link}
              onChange={(e) => setNewTopic({ ...newTopic, link: e.target.value })}
            />
            {error && <div className="error-message">{error}</div>}
            <button onClick={handleAddTopic}>Agregar Tema</button>
          </div>
        )}

        <div className="all-files">
          <h3>Temas</h3>
          <table className="files-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file, index) => (
                <tr key={index}>
                  <td>
                    <Link to={file.link} className="file-link">
                      <div className="file-name">
                        <FaFileAlt /> <span>{file.name}</span>
                      </div>
                    </Link>
                  </td>
                  <td>{file.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Project2;
