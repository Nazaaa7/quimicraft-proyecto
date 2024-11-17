import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaTrash } from 'react-icons/fa';
import Navbar from './navbar';
import './assets/css/vista.css';

const Project2 = () => {
  const [fileName, setFileName] = useState('');
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    // Obtener los temas desde localStorage al cargar el componente
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    setAllFiles(savedFiles);
  }, []);

  const handleAddFile = () => {
    if (fileName.trim() === '') return;

    const newFile = {
      name: fileName,
      date: new Date().toLocaleDateString(),
      link: `/files/${fileName}`, // Simulación de enlace al archivo
    };

    const updatedFiles = [...allFiles, newFile];
    setAllFiles(updatedFiles);
    localStorage.setItem('allFiles', JSON.stringify(updatedFiles));
    setFileName('');
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = allFiles.filter((_, i) => i !== index);
    setAllFiles(updatedFiles);
    localStorage.setItem('allFiles', JSON.stringify(updatedFiles));
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard">
          <h3>Panel del Profesor</h3>
        

          <div className="all-files">
            <table className="files-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {allFiles.map((file, index) => (
                  <tr key={index}>
                    <td>
                      <div className="file-name">
                        <FaFileAlt /> <span>{file.name}</span>
                      </div>
                    </td>
                    <td>{file.date}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteFile(index)}
                        className="delete-button"
                      >
                        <FaTrash />
                      </button>
                    </td>
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

export default Project2;
