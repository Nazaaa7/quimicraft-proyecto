import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import { io } from 'socket.io-client';
import './assets/css/FileDashboard.css';
import './assets/css/temas.css';

const Project2 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [newTopic, setNewTopic] = useState({
    name: '',
    date: '',
    link: '',
  });
  const [isAddTopicVisible, setIsAddTopicVisible] = useState(false);
  const [socket, setSocket] = useState(null); // Socket connection state
  const [error, setError] = useState('');

  useEffect(() => {
    // Conectar con el servidor de Socket.IO
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Obtener temas desde localStorage al cargar el componente
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [
      { name: 'Compuestos organicos', iconType: 'file', date: 'Agosto 2024', link: '/organicCompound' },
      // Otros archivos...
    ];
    setAllFiles(savedFiles);

    // Escuchar eventos de actualización de tema
    newSocket.on('actualizarTema', (tema) => {
      setAllFiles((prevFiles) => [...prevFiles, tema]); // Añadir el nuevo tema
    });

    return () => {
      newSocket.close(); // Cerrar la conexión cuando el componente se desmonte
    };
  }, []);

  // Función para agregar un nuevo tema
  const handleAddTopic = () => {
    if (!newTopic.name || !newTopic.date || !newTopic.link) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const newFile = { ...newTopic, iconType: 'file' };
    const updatedFiles = [...allFiles, newFile];
    setAllFiles(updatedFiles);

    // Guardar el tema en localStorage
    localStorage.setItem('allFiles', JSON.stringify(updatedFiles));

    // Enviar el nuevo tema al servidor usando Socket.IO
    if (socket) {
      socket.emit('nuevoTema', newFile);
    }

    // Limpiar los campos del nuevo tema
    setNewTopic({ name: '', date: '', link: '' });
    setError(''); // Limpiar el mensaje de error
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
    </div>
  );
};

export default Project2;
