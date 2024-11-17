import React, { useState } from 'react';
import { FaFolder, FaFileAlt, FaFilePdf, FaImage, FaUserCircle } from 'react-icons/fa';
import './assets/css/FileDashboard.css';
import Navbar from './navbar';
import Sidebar from './sideBar';
import { Link } from 'react-router-dom';
import Footer from './footer';

const FileDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  

  const allFiles = [
    { name: 'Compuestos organicos', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/organicCompoundConcept' },
    { name: 'Balance de energía', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/balanceEnergy' },
    { name: 'Sedimentación', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/sedimentation' },
    { name: 'Tamizado', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/tamization' },
    { name: 'Filtración', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/filtracion' },
    { name: 'Desintegración mecánica y separación por tamaño de sólidos', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/desintegration' },
    { name: 'Evaporización', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/evaporitation' },
    { name: 'Extracción ', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/extraction' },
    { name: 'Secado', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/driying' },
    { name: 'Cristalización', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/cristalitation' },
    { name: 'Balance de masas', icon: <FaFileAlt />, date: 'Agosto 2024', link: '/balance' },
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
     
       

          <div className="all-files">
            <h3 className='temas'>Temas a dar en el cuatrimestre</h3>
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