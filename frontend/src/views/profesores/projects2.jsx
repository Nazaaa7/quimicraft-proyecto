import React, { useState, useEffect } from "react";
import { FaFileAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./navbar_table";

const Project2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [newTopic, setNewTopic] = useState({
    name: "",
    date: "",
    link: "",
    description: "",
    image: "",
    resources: [],
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("allFiles")) || [];
    setAllFiles(savedFiles);
  }, []);

  const handleAddOrEditTopic = () => {
    if (!newTopic.name || !newTopic.date || !newTopic.link || !newTopic.image || !newTopic.description) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (editMode) {
      const updatedFiles = [...allFiles];
      updatedFiles[editIndex] = newTopic;
      setAllFiles(updatedFiles);
      localStorage.setItem("allFiles", JSON.stringify(updatedFiles));
      setEditMode(false);
    } else {
      const newFile = {
        ...newTopic,
        link: `/topic/${newTopic.name.replace(/\s+/g, "-").toLowerCase()}`,
        type: "pdf",
      };

      const updatedFiles = [...allFiles, newFile];
      setAllFiles(updatedFiles);
      localStorage.setItem("allFiles", JSON.stringify(updatedFiles));
    }

    setNewTopic({ name: "", date: "", link: "", description: "", image: "", resources: [] });
    setIsFormVisible(false);
    setError("");
  };

  const handleEdit = (index) => {
    setNewTopic(allFiles[index]);
    setEditMode(true);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const handleDelete = (index) => {
    const updatedFiles = allFiles.filter((_, i) => i !== index);
    setAllFiles(updatedFiles);
    localStorage.setItem("allFiles", JSON.stringify(updatedFiles));
  };

  const filteredFiles = allFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

    <Navbar/>

      <div className="p-4">
        {/* Botón para mostrar/ocultar el formulario */}
        <button
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            if (editMode) {
              setEditMode(false);
              setNewTopic({ name: "", date: "", link: "", description: "", image: "", resources: [] });
            }
          }}
          className="bg-green-700 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
        >
          {isFormVisible ? "Cerrar Formulario" : "Nuevo Tema"}
        </button>

        {/* Formulario */}
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
              <h3 className="text-xl font-bold mb-4">{editMode ? "Editar Tema" : "Agregar Nuevo Tema"}</h3>
              <input
                type="text"
                placeholder="Nombre del Tema"
                value={newTopic.name}
                onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                type="text"
                placeholder="Fecha"
                value={newTopic.date}
                onChange={(e) => setNewTopic({ ...newTopic, date: e.target.value })}
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                type="text"
                placeholder="Descripción"
                value={newTopic.description}
                onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                type="text"
                placeholder="URL de la Imagen"
                value={newTopic.image}
                onChange={(e) => setNewTopic({ ...newTopic, image: e.target.value })}
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                type="text"
                placeholder="Enlace del Tema"
                value={newTopic.link}
                onChange={(e) => setNewTopic({ ...newTopic, link: e.target.value })}
                className="w-full p-2 mb-3 border rounded"
              />
              {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="px-4 py-2 bg-red-500 rounded hover:bg-gray-400 text-white "
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddOrEditTopic}
                  className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-300"
                >
                  {editMode ? "Actualizar Tema" : "Agregar Tema"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de materiales */}
        <div className="bg-white shadow rounded p-4 w-1/2 mx-auto">
  <h3 className="text-lg font-bold mb-4">Temas</h3>
  <input
    type="text"
    placeholder="Buscar..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full p-2 mb-4 border rounded"
  />
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2 border">Nombre</th>
        <th className="p-2 border">Fecha</th>
        <th className="p-2 border">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {filteredFiles.map((file, index) => (
        <tr key={index} className="text-center">
          <td className="p-2 border">
            <Link to={file.link} className="text-blue-500 hover:underline flex items-center">
              <FaFileAlt className="mr-2" /> {file.name}
            </Link>
          </td>
          <td className="p-2 border">{file.date}</td>
          <td className="p-2 border flex justify-center items-center space-x-2">
            <button
              onClick={() => handleEdit(index)}
              className="text-yellow-500 hover:text-yellow-700 flex items-center"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700 flex items-center"
            >
              <FaTrashAlt />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default Project2;
