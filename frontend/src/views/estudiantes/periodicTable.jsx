import React, { useEffect, useState } from "react";
import "./periodicTable.css";
import Navbar from './navbar_table';

const colorMap = {
  "nonmetal": "#f0ff8f",
  "metalloid": "#cbcc98",
  "noble gas": "#bfffff",
  "alkali metal": "#ff6565",
  "alkaline earth metal": "#ffdead",
  "transition metal": "#ffc1c0",
  "post-transition metal": "#cccccc",
  "lanthanide": "#ffbfff",
  "actinide": "#ff99cc",
};

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredElement, setHoveredElement] = useState(null); // Estado para el elemento activo

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch("http://localhost:3000/elements");
        if (!response.ok) {
          throw new Error("Failed to fetch elements");
        }
        const data = await response.json();
        setElements(data.elements);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

  const handleElementClick = (id) => {
    console.log("Elemento clickeado:", id); // Agrega este log para verificar el valor
    localStorage.setItem("selectedElementId", id); // Guardar el element_id en localStorage
    window.location.href = "/elementDetail"; // Redirigir a la página de detalles
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="periodic-table">
        {elements.map((element) => (
          <div
            className="element"
            key={element.name}
            onClick={() => handleElementClick(element.id)} // Manejo de clic con element_id
            onMouseEnter={() => setHoveredElement(element)} // Establece el elemento activo al hacer hover
            onMouseLeave={() => setHoveredElement(null)} // Limpia el estado al salir del hover
            style={{
              gridRow: element.ypos,
              gridColumn: element.xpos,
              borderColor: colorMap[element.category.toLowerCase()],
              backgroundColor: colorMap[element.category.toLowerCase()],
            }}
          >
            <strong>{element.symbol}</strong>
            <small className="number">{element.number}</small>
            <small className="name">{element.name}</small>
          </div>
        ))}
        
        {/* Cuadro grande para el elemento activo */}
        {hoveredElement && (
          <div
            className="element-hover"
            style={{
              gridRow: "1 / span 2", // Ocupa filas 1 y 2
              gridColumn: "7 / span 2", // Ocupa columnas 7 y 8
              borderColor: colorMap[hoveredElement.category.toLowerCase()],
              backgroundColor: colorMap[hoveredElement.category.toLowerCase()],
            }}
          >
            <strong style={{ fontSize: "24px" }}>{hoveredElement.symbol}</strong>
            <small className="number" style={{ fontSize: "14px" }}>{hoveredElement.number}</small>
            <small className="name" style={{ fontSize: "14px" }}>{hoveredElement.name}</small>
          </div>
        )}
      </div>
    </>
  );
};

export default PeriodicTable;
