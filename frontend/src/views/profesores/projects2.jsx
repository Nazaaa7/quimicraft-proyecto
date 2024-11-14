import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import './assets/css/FileDashboard.css';
import './assets/css/temas.css';

const File = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [newTopic, setNewTopic] = useState({
    name: '',
    date: '',
    link: '',
  });
  const [isAddTopicVisible, setIsAddTopicVisible] = useState(false);  // Estado para controlar visibilidad de la caja

  // Cargar archivos desde localStorage al cargar el componente
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [
      { name: 'Compuestos organicos', iconType: 'file', date: 'Agosto 2024', link: '/organicCompound' },
      { name: 'Balance de energía', iconType: 'file', date: 'Agosto 2024', link: '/balanceEnergy' },
      { name: 'Sedimentación', iconType: 'file', date: 'Agosto 2024', link: '/sedimentation' },
      { name: 'Tamizado', iconType: 'file', date: 'Agosto 2024', link: '/tamization' },
      { name: 'Filtración', iconType: 'file', date: 'Agosto 2024', link: '/filtracion' },
      { name: 'Desintegración mecánica y separación por tamaño de sólidos', iconType: 'file', date: 'Agosto 2024', link: '/desintegration' },
      { name: 'Evaporización', iconType: 'file', date: 'Agosto 2024', link: '/organicCompoundConcept' },
      { name: 'Extracción ', iconType: 'file', date: 'Agosto 2024', link: '/compuestos-inorganicos' },
      { name: 'Secado', iconType: 'file', date: 'Agosto 2024', link: '/estequiometria' },
      { name: 'Cristalización', iconType: 'file', date: 'Agosto 2024', link: '/quimica-transformadora' },
      { name: 'Balance de masas', iconType: 'file', date: 'Agosto 2024', link: '/nomenclatura' },
    ];
    setAllFiles(savedFiles);
  }, []);

  // Guardar archivos en localStorage cada vez que el estado de allFiles cambie
  useEffect(() => {
    if (allFiles.length > 0) {
      localStorage.setItem('allFiles', JSON.stringify(allFiles));
    }
  }, [allFiles]);

  // Función para agregar un nuevo tema
  const handleAddTopic = () => {
    if (newTopic.name && newTopic.date && newTopic.link) {
      const newFile = { ...newTopic, iconType: 'file' };
      const updatedFiles = [...allFiles, newFile];
      
      // Actualizar el estado con los archivos nuevos
      setAllFiles(updatedFiles);

      // Limpiar los campos del nuevo tema
      setNewTopic({ name: '', date: '', link: '' });
    }
  };

  // Filtrar los archivos basados en el término de búsqueda
  const filteredFiles = allFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard">
          {/* Botón para mostrar/ocultar la caja de agregar tema */}
          <button 
            onClick={() => setIsAddTopicVisible(!isAddTopicVisible)} 
            className="toggle-topic-button"
          >
            {isAddTopicVisible ? 'Ocultar Caja de Nuevo Tema' : 'Más Materia'}
          </button>

          {/* Caja de agregar nuevo tema */}
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
                placeholder="Fecha (Ej: Agosto 2024)"
                value={newTopic.date}
                onChange={(e) => setNewTopic({ ...newTopic, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enlace del Tema (Ej: /nuevoTema)"
                value={newTopic.link}
                onChange={(e) => setNewTopic({ ...newTopic, link: e.target.value })}
              />
              <button onClick={handleAddTopic}>Agregar Tema</button>
            </div>
          )}

          {/* Sección de archivos */}
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
    </div>
  );
};

export default File;
