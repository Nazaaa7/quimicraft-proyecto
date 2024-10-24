import React, { useState } from 'react';
import { FaFolder, FaFileAlt, FaFilePdf, FaImage, FaUserCircle } from 'react-icons/fa';
import { Search } from 'lucide-react';
import './assets/css/FileDashboard.css';
import Navbar from './navbar';
import Sidebar from './sideBar';
import { Link } from 'react-router-dom';

const FileDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  

  const allFiles = [
    { name: 'Compuestos organicos', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/organicCompoundConcept' },
    { name: 'Balance de energía', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/compuestos-inorganicos' },
    { name: 'Sedimentación', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/estequiometria' },
    { name: 'Tamizado', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/quimica-transformadora' },
    { name: 'Filtración', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/nomenclatura' },
    { name: 'Desintegración mecánica y separación por tamaño de sólidos', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/sistemas-dispersos' },
    { name: 'Evaporización', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/organicCompoundConcept' },
    { name: 'Extracción ', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/compuestos-inorganicos' },
    { name: 'Secado', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/estequiometria' },
    { name: 'Cristalización', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/quimica-transformadora' },
    { name: 'Balance de masas', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/nomenclatura' },
  ];

  // Filtrar los archivos basado en el término de búsqueda
  const filteredFiles = allFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      {/* Barra de búsqueda */}


      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard">
        <div className="search-container">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="search-input-container">
            <div className="search-icon">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre de archivo..."
              className="search-input"
            />
          </div>
        </form>
        <button className="more-filters-button">
          Más Filtros
        </button>
      </div>
       

          <div className="all-files">
            <h3>Temas</h3>
            <table className="files-table">
              <thead>
                <tr>
                  <th>nombre</th>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDashboard;