import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import { io } from 'socket.io-client';
import './assets/css/FileDashboard.css';

const Project2Alumno = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [socket, setSocket] = useState(null); // Socket connection state

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
