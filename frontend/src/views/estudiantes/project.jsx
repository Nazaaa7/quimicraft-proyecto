import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import './assets/css/FileDashboard.css';

const Project2Alumno = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    // Cargar los temas desde localStorage al iniciar
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    setAllFiles(savedFiles);

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const updatedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
      setAllFiles(updatedFiles);
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Filtrar los archivos basados en el término de búsqueda
  const filteredFiles = allFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar tema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="all-files">
            <h3>Temas Disponibles</h3>
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

export default Project2Alumno;
