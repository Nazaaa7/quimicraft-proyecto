import { useEffect, useState } from "react";
import "./periodicTable.css";
import Navbar from './navbar_table';

const colorMap = {
  "nonmetal": "#c3df76", // Verde claro suave
  "metalloid": "#9e9d24", // Verde oliva, más oscuro y distintivo
  "noble gas": "#adebbb", // Un verde muy suave para gases nobles
  "alkali metal": "#7bc67e", // Verde más fuerte para metales alcalinos
  "alkaline earth metal": "#82c991", // Verde pasto para tierras raras alcalinas
  "transition metal": "#64b568", // Un verde intermedio para metales de transición
  "post-transition metal": "#98d5a3", // Verde algo más claro para metales post-transición
  "lanthanide": "#76e2a3", // Verde pasto claro para lantánidos
  "actinide": "#5cbf71", // Un verde más profundo para actínidos
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

  const handleElementClick = (id,name) => {
    console.log("Elemento clickeado:", id); // Agrega este log para verificar el valor
    localStorage.setItem("selectedElementId", id); // Guardar el element_id en localStorage
    localStorage.setItem("selectedName",name);
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
            onClick={() => handleElementClick(element.id, element.name)} // Manejo de clic con element_id
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
              gridColumn: "4 / span 2", // Ocupa columnas 7 y 8
              borderColor: colorMap[hoveredElement.category.toLowerCase()],
              backgroundColor: colorMap[hoveredElement.category.toLowerCase()],
            }}
          >
            <strong style={{ fontSize: "24px" }}>{hoveredElement.symbol}</strong>
            <small className="number" style={{ fontSize: "14px" }}>{hoveredElement.number}</small>
            <small className="name" style={{ fontSize: "14px" }}>{hoveredElement.name}</small>
          </div>
        )}

        
  {/* Glosario de colores */}
  <div className="color-glossary" style={{
    gridRow: "1 / span 3", // Ocupa filas 7 a 11
    gridColumn: "7 / span 6", // Ocupa columnas 1 y 2
  }}>
    <h4>Glosario de Colores</h4>
    <ul className="color-glossary">
  <li><strong>Nonmetal:</strong> {colorMap["nonmetal"]} - Verde claro suave <strong className="text-right">Metalloid:</strong> {colorMap["metalloid"]} - Verde oliva</li>
  <li><strong>Noble Gas:</strong> {colorMap["noble gas"]} - Verde muy suave <strong>Alkali Metal:</strong> {colorMap["alkali metal"]} - Verde más fuerte</li>
  <li><strong>Alkaline Earth Metal:</strong> {colorMap["alkaline earth metal"]} - Verde pasto<strong>Transition Metal:</strong> {colorMap["transition metal"]} - Verde intermedio</li>
  <li><strong>Post-Transition Metal:</strong> {colorMap["post-transition metal"]} - Verde más claro <strong>Lanthanide:</strong> {colorMap["lanthanide"]} - Verde pasto claro</li>
  <li className="text-center"><strong>Actinide:</strong> {colorMap["actinide"]} - Verde profundo</li>
</ul>

  </div>
      </div>
    </>
  );
};

export default PeriodicTable;
