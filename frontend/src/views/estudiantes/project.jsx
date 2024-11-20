import React, { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./assets/css/FileDashboard.css";
import Navbar from "./navbar_table";

const Project2Alumno = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    // Cargar los temas desde localStorage al iniciar
    const savedFiles = JSON.parse(localStorage.getItem("allFiles")) || [];
    setAllFiles([...savedFiles]);

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const updatedFiles = JSON.parse(localStorage.getItem("allFiles")) || [];
      setAllFiles([...updatedFiles]);
    };

    window.addEventListener("storage", handleStorageChange);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Filtrar los archivos basado en el término de búsqueda
  const filteredFiles = allFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard">
          <div className="all-files">
            <h3 className="temas">Temas a dar en el cuatrimestre</h3>
            {filteredFiles.length > 0 ? (
              <div className="files-table-container">
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
                          <Link
                            to={`/resources/${file.name}`} // Ruta dinámica corregida
                            className="file-link"
                          >
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
            ) : (
              <p>No se encontraron temas que coincidan con tu búsqueda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project2Alumno;