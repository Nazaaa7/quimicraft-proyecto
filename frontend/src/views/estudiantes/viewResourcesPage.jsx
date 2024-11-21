import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar_table";
import Footer from "./footer";
import Chat from "./chat";
import { FaFilePdf, FaYoutube, FaGamepad, FaFileAlt } from "react-icons/fa";
import { Search } from "lucide-react";

const ViewResourcesPage = () => {
  const { topicName } = useParams(); // Nombre del tema extraído de la URL
  const [topic, setTopic] = useState(null); // Estado para el tema seleccionado
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [selectedType, setSelectedType] = useState("all"); // Tipo de material seleccionado
  const [isChatOpen, setIsChatOpen] = useState(false); // Estado del chat

  const allFiles = [
    {
      name: "Introducción a Compuestos Orgánicos",
      icon: <FaFileAlt />,
      date: "Agosto 2024",
      type: "pdf",
      tags: ["teoría", "fundamentos"],
      link: "https://quimicaitatljmm.wordpress.com/wp-content/uploads/2014/04/unidad-iii-compuestos-organicos-e-inorganicos.pdf",
    },
    {
      name: "Guía de Hidrocarburos",
      icon: <FaFilePdf />,
      date: "Agosto 2024",
      type: "pdf",
      tags: ["guía", "práctica"],
      link: "https://www.une.edu.pe/docentesune/jjhoncon/Descargas/Fasciculos%20CTA/Los%20Hidrocarburos.pdf",
    },
    {
      name: "Tutorial: Nomenclatura Orgánica",
      icon: <FaYoutube />,
      date: "Agosto 2024",
      type: "video",
      tags: ["tutorial", "nomenclatura"],
      link: "https://www.youtube.com/watch?v=jxdNnKn2yuA",
    },
    {
      name: "Carbohidratos Argentinas",
      icon: <FaGamepad />,
      date: "Agosto 2024",
      type: "game",
      tags: ["juego", "carbohidratos"],
      link: "https://www.cerebriti.com/juegos-de-tecnologia/carbohidratos-argentinas",
    },
    {
      name: "Características del Carbono",
      icon: <FaGamepad />,
      date: "Agosto 2024",
      type: "game",
      tags: ["juego", "carbono"],
      link: "https://www.cerebriti.com/juegos-de-ciencias/caracteristicas-del-carbono-c",
    },
    {
      name: "Test Orgánico",
      icon: <FaGamepad />,
      date: "Agosto 2024",
      type: "game",
      tags: ["juego", "evaluación"],
      link: "https://www.cerebriti.com/juegos-de-ciencias/test-organico",
    },
  ];

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("allFiles")) || [];
    const selectedTopic = savedFiles.find(
      (file) => file.name.replace(/\s+/g, "-").toLowerCase() === topicName
    );

    setTopic(
      selectedTopic || {
        name: topicName.replace(/-/g, " "),
        resources: allFiles, // Asignar recursos predeterminados al tema
        image: "https://www.example.com/image.jpg" // Asegúrate de tener la URL de la imagen
      }
    );
  }, [topicName]);

  const materialTypes = [
    { id: "all", label: "Todos" },
    { id: "pdf", label: "PDF", icon: <FaFilePdf /> },
    { id: "video", label: "Videos", icon: <FaYoutube /> },
    { id: "game", label: "Juegos", icon: <FaGamepad /> },
  ];

  const filteredResources = topic?.resources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (!topic) {
    return <p className="text-center mt-10 text-gray-500">Cargando datos del tema...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-100">
        {/* Encabezado */}
        <div className="bg-white shadow-md py-6 px-8">
          <h1 className="text-2xl font-bold">{topic.name}</h1>
          {topic.description && <p className="text-gray-600 mt-2">{topic.description}</p>}
          {topic.image && <img src={topic.image} alt={topic.name} className="mx-auto mt-4 w-1/2" />} {/* Imagen cargada */}
        </div>

        {/* Contenedor de búsqueda */}
        <div className="bg-white shadow mt-4 py-4 px-6 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre de recurso..."
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {materialTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            onClick={() => setIsChatOpen(true)}
          >
            Consultar tema
          </button>
        </div>

        {/* Recursos disponibles */}
        <div className="mt-6 px-8">
          <h3 className="text-xl font-semibold">Recursos Disponibles</h3>
          {filteredResources?.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left py-2 px-4">Nombre</th>
                    <th className="text-left py-2 px-4">Tipo</th>
                    <th className="text-left py-2 px-4">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((resource, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors border-b last:border-b-0"
                    >
                      <td className="py-2 px-4">
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {resource.name}
                        </a>
                      </td>
                      <td className="py-2 px-4 capitalize">{resource.type}</td>
                      <td className="py-2 px-4">{resource.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No hay recursos disponibles para este tema.</p>
          )}
        </div>
      </div>

      {/* Chat */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 md:w-1/2">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setIsChatOpen(false)}
            >
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
