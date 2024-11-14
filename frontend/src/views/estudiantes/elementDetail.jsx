/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Navbar from "./navbar_table";

const CardContainer = ({ children, title, className = "" }) => (
  <div className={`p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow ${className}`}>
    {title && <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">{title}</h3>}
    {children}
  </div>
);

const ElementDetail = () => {
  const [elementDetails, setElementDetails] = useState(null);
  const [elementName, setElementName] = useState("");  // Guardamos el nombre aquí
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const elementId = localStorage.getItem("selectedElementId");
    const elementNameFromLocalStorage = localStorage.getItem("selectedName");
    
    if (!elementId) {
      setError("Elemento no encontrado.");
      setLoading(false);
      return;
    }

    if (elementNameFromLocalStorage) {
      setElementName(elementNameFromLocalStorage);  // Guardamos el nombre en el estado
    }

    const fetchElementDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/elements/${elementId}`);
        if (!response.ok) throw new Error("Failed to fetch element details");
        const data = await response.json();
        setElementDetails(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchElementDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
        <div className="p-6 bg-white rounded-xl shadow-lg text-gray-700">
          Cargando...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-pink-500">
        <div className="p-6 bg-white rounded-xl shadow-lg text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!elementDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="p-6 bg-white rounded-xl shadow-lg text-gray-700">
          No se encuentran detalles para este elemento.
        </div>
      </div>
    );
  }

  const PhysicalProperty = ({ label, value }) => (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:scale-105 transition-transform shadow-md">
      <span className="font-semibold text-blue-600">{label}: </span>
      <span className="text-gray-700">{value}</span>
    </div>
  );

  const ChemicalProperty = ({ label, content }) => (
    <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl hover:scale-105 transition-transform shadow-md">
      <span className="block font-semibold text-indigo-600 mb-2">{label}</span>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );

  const InterestingDataItem = ({ title, content }) => (
    <CardContainer title={title}>
      <p className="text-gray-600 leading-relaxed">
        {content || "Información no disponible"}
      </p>
    </CardContainer>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-custom-green to-white-50"> {/* Fondo verde principal */}
      <Navbar />
      <CardContainer className="mb-4 mt-5 bg-[#d7f7b9]">
        <p className="text-3xl text-center text-black font-semibold">{elementName || "Nombre no disponible"}</p>
      </CardContainer>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <CardContainer className="mb-8">
          <p className="text-center text-gray-700 text-lg">{elementDetails.name_origin}</p>
        </CardContainer>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <CardContainer title="Configuración Electrónica">
              <p className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg font-mono text-center text-gray-700">
                {elementDetails.electronic_configuration || "Información no disponible"}
              </p>
            </CardContainer>

            <CardContainer title="Información Principal">
              <div className="space-y-6">
                {[ 
                  {
                    title: "Origen del Elemento",
                    content: elementDetails.discovery_description
                  },
                  {
                    title: "Ley Periódica",
                    content: elementDetails.periodic_law_description
                  },
                  {
                    title: "Evolución en la Tabla Periódica",
                    content: elementDetails.periodic_table_evolution
                  }
                ].map((section, index) => (
                  <div key={index} className="py-4 border-b border-gray-200 last:border-0">
                    <h4 className="text-gray-800 font-semibold mb-2">{section.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{section.content || "Información no disponible"}</p>
                  </div>
                ))}
              </div>
            </CardContainer>

            <div className="grid grid-cols-3 gap-10 text-center">
              <CardContainer className="bg-gradient-to-r from-teal-50 to-teal-100">
                <h4 className="font-medium text-teal-600">Protones</h4>
                <p className="text-xl text-teal-700">{elementDetails.protons || "N/A"}</p>
              </CardContainer>
              <CardContainer className="bg-gradient-to-r from-purple-50 to-purple-100">
                <h4 className="font-medium text-purple-600">Electrones</h4>
                <p className="text-xl text-purple-700">{elementDetails.electrons || "N/A"}</p>
              </CardContainer>
              <CardContainer className="bg-gradient-to-r from-pink-50 to-pink-100">
                <h4 className="font-medium text-pink-600">Neutrones</h4>
                <p className="text-xl text-pink-700">{elementDetails.neutrons || "N/A"}</p>
              </CardContainer>
            </div>
          </div>
          
          <div className="space-y-8">
            <CardContainer>
              <img 
                src={elementDetails.image} 
                alt="Elemento" 
                className="w-full rounded-lg shadow-lg"
              />
            </CardContainer>

            <CardContainer title="Propiedades Físicas">
              <div className="space-y-3">
                {[ 
                  { label: "Punto de Fusión", value: `${elementDetails.melting_point || "N/A"} °C` },
                  { label: "Punto de Ebullición", value: `${elementDetails.boiling_point || "N/A"} °C` },
                  { label: "Densidad", value: `${elementDetails.density || "N/A"} g/cm³` },
                  { label: "Conductividad", value: elementDetails.conductivity || "N/A" },
                  { label: "Valencia", value: elementDetails.valence || "N/A" },
                  { label: "Isótopos", value: elementDetails.isotopes || "N/A" }
                ].map((prop, index) => (
                  <PhysicalProperty key={index} {...prop} />
                ))}
              </div>
            </CardContainer>

            <CardContainer title="Características Químicas">
              <div className="space-y-4">
                <ChemicalProperty 
                  label="Reactividad"
                  content={elementDetails.reactivity || "Información no disponible"}
                />
                <ChemicalProperty 
                  label="Compuestos Típicos"
                  content={elementDetails.typical_compounds || "Información no disponible"}
                />
              </div>
            </CardContainer>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Datos Interesantes</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[ 
              { title: "Usos Cotidianos", content: elementDetails.everyday_uses },
              { title: "Impacto Ambiental", content: elementDetails.environmental_impact },
              { title: "Usos Industriales", content: elementDetails.industrial_uses }
            ].map((item, index) => (
              <InterestingDataItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementDetail;
