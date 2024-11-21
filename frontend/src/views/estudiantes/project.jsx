import React, { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./navbar_table";

const Project2Alumno = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("allFiles")) || [];
    setAllFiles(savedFiles);
  }, []);

  const filteredFiles = allFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="p-4">
        <div className="bg-white shadow rounded p-4 w-1/2 mx-auto">
          <h3 className="text-lg font-bold mb-4">Temas Disponibles</h3>
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
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">
                    <Link
                      to={`/resources/${file.name.replace(/\s+/g, "-").toLowerCase()}`}
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <FaFileAlt className="mr-2" /> {file.name}
                    </Link>
                  </td>
                  <td className="p-2 border">{file.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Project2Alumno;
