import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './assets/css/FileDashboard.css';
import Navbar from './navbar';
import Sidebar from './sideBar';
import Footer from './footer';

const Project2Alumno = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allFiles, setAllFiles] = useState([]);

  // Temas predeterminados
  const defaultFiles = [
    { name: 'Compuestos orgánicos', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/OrganicCompoundConcept' },
    { name: 'Balance de energía', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/balanceEnergy' },
    { name: 'Sedimentación', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/sedimentation' },
    { name: 'Tamizado', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/tamization' },
    { name: 'Filtración', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/filtracion' },
    { name: 'Desintegración mecánica y separación por tamaño de sólidos', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/desintegration' },
    { name: 'Evaporización', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/evaporitation' },
    { name: 'Extracción', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/extraction' },
    { name: 'Secado', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/driying' },
    { name: 'Cristalización', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/cristalitation' },
    { name: 'Balance de masas', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/balance' },
  ];

  useEffect(() => {
    // Cargar los temas desde localStorage al iniciar
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    setAllFiles([...defaultFiles, ...savedFiles]);

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const updatedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
      setAllFiles([...defaultFiles, ...updatedFiles]);
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Filtrar los archivos basado en el término de búsqueda
  const filteredFiles = allFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard">
      
          <div className="all-files">
            <h3 className="temas">Temas a dar en el cuatrimestre</h3>
            {filteredFiles.length > 0 ? (
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
                            {file.icon} <span>{file.name}</span>
                          </div>
                        </Link>
                      </td>
                      <td>{file.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No se encontraron temas que coincidan con tu búsqueda.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Project2Alumno;
