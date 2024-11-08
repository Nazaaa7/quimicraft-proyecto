import React, { useState } from 'react';
import { FaFileAlt, FaFilePdf, FaYoutube, FaGamepad, FaArrowLeft } from 'react-icons/fa';
import { Search } from 'lucide-react';
import './assets/css/OrganicCompoundConcept.css';
import Navbar from './navbar';
import balancee from './assets/img/balancee.jpg';
import Chat from './chat';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';

const BalanceEnergy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const materialTypes = [
    { id: 'all', label: 'Todos' },
    { id: 'pdf', label: 'PDF', icon: <FaFilePdf /> },
    { id: 'video', label: 'Videos', icon: <FaYoutube /> },
    { id: 'game', label: 'Juegos', icon: <FaGamepad /> }
  ];

  const allFiles = [
    {
      name: 'Introducción a Compuestos Orgánicos',
      icon: <FaFileAlt />,
      date: 'Agosto 2024',
      type: 'pdf',
      tags: ['teoría', 'fundamentos'],
      link: 'https://quimicaitatljmm.wordpress.com/wp-content/uploads/2014/04/unidad-iii-compuestos-organicos-e-inorganicos.pdf'
    },
    {
      name: 'Guía de Hidrocarburos',
      icon: <FaFilePdf />,
      date: 'Agosto 2024',
      type: 'pdf',
      tags: ['guía', 'práctica'],
      link: 'https://www.une.edu.pe/docentesune/jjhoncon/Descargas/Fasciculos%20CTA/Los%20Hidrocarburos.pdf'
    },
    {
      name: 'Tutorial: Nomenclatura Orgánica',
      icon: <FaYoutube />,
      date: 'Agosto 2024',
      type: 'video',
      tags: ['tutorial', 'nomenclatura'],
      link: 'https://www.youtube.com/watch?v=jxdNnKn2yuA'
    },
    {
      name: 'Carbohidratos Argentinas',
      icon: <FaGamepad />,
      date: 'Agosto 2024',
      type: 'game',
      tags: ['juego', 'carbohidratos'],
      link: 'https://www.cerebriti.com/juegos-de-tecnologia/carbohidratos-argentinas'
    },
    {
      name: 'Características del Carbono',
      icon: <FaGamepad />,
      date: 'Agosto 2024',
      type: 'game',
      tags: ['juego', 'carbono'],
      link: 'https://www.cerebriti.com/juegos-de-ciencias/caracteristicas-del-carbono-c'
    },
    {
      name: 'Test Orgánico',
      icon: <FaGamepad />,
      date: 'Agosto 2024',
      type: 'game',
      tags: ['juego', 'evaluación'],
      link: 'https://www.cerebriti.com/juegos-de-ciencias/test-organico'
    },
    {
      name: 'Introducción a Compuestos Orgánicos',
      icon: <FaFileAlt />,
      date: 'Agosto 2024',
      type: 'pdf',
      tags: ['teoría', 'fundamentos'],
      link: 'https://quimicaitatljmm.wordpress.com/wp-content/uploads/2014/04/unidad-iii-compuestos-organicos-e-inorganicos.pdf'
    },
    {
      name: 'Guía de Hidrocarburos',
      icon: <FaFilePdf />,
      date: 'Agosto 2024',
      type: 'pdf',
      tags: ['guía', 'práctica'],
      link: 'https://www.une.edu.pe/docentesune/jjhoncon/Descargas/Fasciculos%20CTA/Los%20Hidrocarburos.pdf'
    },
    {
      name: 'Tutorial: Nomenclatura Orgánica',
      icon: <FaYoutube />,
      date: 'Agosto 2024',
      type: 'video',
      tags: ['tutorial', 'nomenclatura'],
      link: 'https://www.youtube.com/watch?v=jxdNnKn2yuA'
    },
    {
      name: 'Carbohidratos Argentinas',
      icon: <FaGamepad />,
      date: 'Agosto 2024',
      type: 'game',
      tags: ['juego', 'carbohidratos'],
      link: 'https://www.cerebriti.com/juegos-de-tecnologia/carbohidratos-argentinas'
    },
    {
      name: 'Características del Carbono',
      icon: <FaGamepad />,
      date: 'Agosto 2024',
      type: 'game',
      tags: ['juego', 'carbono'],
      link: 'https://www.cerebriti.com/juegos-de-ciencias/caracteristicas-del-carbono-c'
    },
    {
      name: 'Test Orgánico',
      icon: <FaGamepad />,
      date: 'Agosto 2024',
      type: 'game',
      tags: ['juego', 'evaluación'],
      link: 'https://www.cerebriti.com/juegos-de-ciencias/test-organico'
    },
    
    
  ];

  const filteredFiles = allFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || file.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <Navbar />
      <div className="dashboard-containerr">
        {/* Botón de retroceso */}
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft size={24} />
        </button>
        
        <div className="container">
          {/* Buscador y Filtros */}
          <div className="search-container">
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <div className="search-input-container">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre de archivo..."
                  className="search-input"
                />
                <div className="search-icon">
                  <Search size={20} />
                </div>
              </div>
            </form>
            
            {/* Lista desplegable para los filtros */}
            <div className="dropdown">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="filter-dropdown"
              >
                {materialTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón para abrir el chat */}
            <button className="open-chat-button" onClick={() => setIsChatOpen(true)}>
              Consultar tema
            </button>
          </div>

          <h1 className="text-2xl font-bold mb-4">Balance de energía</h1>
          <p className="text-gray-700">
            Los balances de materia y energía (BMyE) son una de las herramientas más importantes de la ingeniería de procesos para contabilizar los flujos de materia y energía entre procesos industriales y sus alrededores.
          </p>

          <div className="banner-container mb-6">
            <img 
              src={balancee} 
              alt="Balance de energía"
              className="w-full object-cover rounded-lg mb-4 size-16"
            />
          </div>

          {/* Tabla de Archivos */}
          <div className="all-files">
            <h3 className="text-xl font-semibold mt-6">Recursos Disponibles</h3>
            <table className="files-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <tr key={index}>
                    <td>
                      <a href={file.link} target="_blank" rel="noopener noreferrer" className="file-link">
                        <div className="file-name">
                          {file.icon} <span>{file.name}</span>
                        </div>
                      </a>
                    </td>
                    <td>{materialTypes.find(t => t.id === file.type)?.label || 'Otro'}</td>
                    <td>{file.date}</td>
                  </tr>
         
        ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Chat como modal */}
  {isChatOpen && (
    <div className="chat-modal">
      <div className="chat-modal-content">
        <button className="close-chat-button" onClick={() => setIsChatOpen(false)}>
          X
        </button>
        <Chat />
      </div>
    </div>
  )}
</div>

<Footer />
</div>
);
};

export default BalanceEnergy;