import React, { useEffect, useState } from "react";
import Navbar from "./navbar_table";

const CardContainer = ({ children, title, className = "" }) => (
  <div className={`p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}>
    {title && <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">{title}</h3>}
    {children}
  </div>
);

const ElementDetail = () => {
  const [elementDetails, setElementDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const elementId = localStorage.getItem("selectedElementId");
    
    if (!elementId) {
      setError("Elemento no encontrado.");
      setLoading(false);
      return;
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 bg-white rounded-xl shadow-sm text-gray-700">
          Cargando...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 bg-white rounded-xl shadow-sm text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!elementDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 bg-white rounded-xl shadow-sm text-gray-700">
          No se encuentran detalles para este elemento.
        </div>
      </div>
    );
  }

  const PhysicalProperty = ({ label, value }) => (
    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <span className="font-medium text-gray-700">{label}: </span>
      <span className="text-gray-600">{value}</span>
    </div>
  );

  const ChemicalProperty = ({ label, content }) => (
    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <span className="block font-medium text-gray-700 mb-2">{label}</span>
      <p className="text-gray-600 leading-relaxed">{content}</p>
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CardContainer className="mb-8">
          <p className="text-center text-gray-700 text-lg">
            {elementDetails.name_origin}
          </p>
        </CardContainer>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CardContainer title="Configuración Electrónica">
              <p className="p-4 bg-gray-50 rounded-lg font-mono text-center text-gray-700">
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
                  <div key={index} className="py-4 border-b border-gray-100 last:border-0">
                    <h4 className="text-gray-800 font-medium mb-2">{section.title}</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content || "Información no disponible"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContainer>
          </div>

          <div className="space-y-8">
            <CardContainer>
              <img 
                src={elementDetails.image} 
                alt="Elemento" 
                className="w-full rounded-lg"
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

        <div className="mt-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-6">Datos Interesantes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Usos Cotidianos",
                content: elementDetails.everyday_uses
              },
              {
                title: "Impacto Ambiental",
                content: elementDetails.environmental_impact
              },
              {
                title: "Usos Industriales",
                content: elementDetails.industrial_uses
              }
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