import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaTrash, FaEdit } from 'react-icons/fa';
import Navbar from './navbar';
import './assets/css/vista.css';
import Footer from '../admin/footer'; // Asegúrate de que esta ruta sea correcta

const Project2 = () => {
  const [fileName, setFileName] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Para saber qué archivo estamos editando

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

  // Función para manejar la edición de un archivo
  const handleEditFile = (index) => {
    setFileName(allFiles[index].name);  // Establecemos el nombre del archivo para editar
    setEditingIndex(index);  // Guardamos el índice del archivo que estamos editando
  };

  // Función para guardar la edición
  const handleSaveEdit = () => {
    if (fileName.trim() === '') return;

    const updatedFiles = [...allFiles];
    updatedFiles[editingIndex].name = fileName;  // Actualizamos el nombre del archivo editado
    setAllFiles(updatedFiles);
    localStorage.setItem('allFiles', JSON.stringify(updatedFiles));
    setFileName('');
    setEditingIndex(null);  // Limpiamos el índice después de editar
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
                        <FaFileAlt />
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)} // Actualizamos el valor mientras se edita
                          />
                        ) : (
                          <span>{file.name}</span>
                        )}
                      </div>
                    </td>
                    <td>{file.date}</td>
                    <td>
                      {/* Mostrar el botón de editar solo si no estamos editando */}
                      {editingIndex !== index ? (
                        <button
                          onClick={() => handleEditFile(index)}
                          className="edit-button"
                        >
                          <FaEdit />
                        </button>
                      ) : (
                        <button
                          onClick={handleSaveEdit}
                          className="save-edit-button"
                        >
                          Guardar
                        </button>
                      )}
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
