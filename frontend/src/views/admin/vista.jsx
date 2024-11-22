import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaTrash, FaEdit } from 'react-icons/fa';
import Navbar from './navbar_re';

const Project2 = () => {
  const [fileName, setFileName] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('allFiles')) || [];
    setAllFiles(savedFiles);
  }, []);

  const handleAddFile = () => {
    if (fileName.trim() === '') return;

    const newFile = {
      name: fileName,
      date: new Date().toLocaleDateString(),
      link: `/files/${fileName}`,
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

  const handleEditFile = (index) => {
    setFileName(allFiles[index].name);
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (fileName.trim() === '') return;

    const updatedFiles = [...allFiles];
    updatedFiles[editingIndex].name = fileName;
    setAllFiles(updatedFiles);
    localStorage.setItem('allFiles', JSON.stringify(updatedFiles));
    setFileName('');
    setEditingIndex(null); // Clear the editing state after saving
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-white-700 min-h-screen ">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Panel del Profesor</h3>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {allFiles.map((file, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <FaFileAlt className="mr-2" />
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="border rounded p-1"
                          />
                        ) : (
                          <span>{file.name}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">{file.date}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {editingIndex === index ? (
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-500 hover:text-green-700"
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditFile(index)}
                            className="text-yellow-500 hover:text-yellow-700"
                          >
                            <FaEdit />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
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
