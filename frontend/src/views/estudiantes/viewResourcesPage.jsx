import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import Chat from './chat';
import { FaFileAlt, FaFilePdf, FaYoutube, FaGamepad } from 'react-icons/fa';
import { Search } from 'lucide-react';
import './assets/css/OrganicCompoundConcept.css';

const ViewResourcesPage = () => {
  const { topicName } = useParams(); // Nombre del tema extraído de la URL
  const [topic, setTopic] = useState(null); // Estado para el tema seleccionado
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [selectedType, setSelectedType] = useState('all'); // Tipo de material seleccionado
  const [isChatOpen, setIsChatOpen] = useState(false); // Estado del chat

  useEffect(() => {
    // Obtener los temas desde localStorage
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    console.log(savedFiles); // Verificar si los archivos se obtienen correctamente

    // Buscar el tema por su nombre en el arreglo de archivos
    const selectedTopic = savedFiles.find(
      (file) => file.name.replace(/\s+/g, '-').toLowerCase() === topicName
    );

    // Si se encuentra el tema, lo establecemos en el estado
    setTopic(
      selectedTopic || {
        name: topicName.replace(/-/g, ' '), // Convertimos el nombre de la URL al formato original
        resources: [],
      }
    );
  }, [topicName]);

  // Filtrado de recursos por búsqueda y tipo
  const materialTypes = [
    { id: 'all', label: 'Todos' },
    { id: 'pdf', label: 'PDF', icon: <FaFilePdf /> },
    { id: 'video', label: 'Videos', icon: <FaYoutube /> },
    { id: 'game', label: 'Juegos', icon: <FaGamepad /> }
  ];

  const filteredResources = topic?.resources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  console.log(filteredResources);  // Verificar los recursos filtrados

  // Si los datos no están listos o el tema no tiene recursos, mostramos un mensaje
  if (!topic || topic.resources.length === 0) {
    return <p>No hay recursos disponibles para este tema.</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="dashboard-containerr">
        {/* Sección de búsqueda */}
        <div className="search-container">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <div className="search-input-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre de recurso..."
                className="search-input"
              />
              <div className="search-icon">
                <Search size={20} />
              </div>
            </div>
          </form>

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

          <button className="open-chat-button" onClick={() => setIsChatOpen(true)}>
            Consultar tema
          </button>
        </div>

        <div className="topic-banner">
          <h1>{topic.name}</h1>
          {topic.description && <p>{topic.description}</p>}
          {topic.image && <img src={topic.image} alt={topic.name} className="topic-image" />}
        </div>

        {/* Tabla de recursos */}
        <div className="all-files">
          <h3 className="text-xl font-semibold mt-6">Recursos Disponibles</h3>
          {filteredResources.length > 0 ? (
            <table className="files-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-link"
                      >
                        {resource.name}
                      </a>
                    </td>
                    <td>{resource.type}</td>
                    <td>{resource.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay recursos disponibles para este tema.</p>
          )}
        </div>
      </div>

      {/* Chat */}
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

      <Footer />
    </div>
  );
};

export default ViewResourcesPage;
