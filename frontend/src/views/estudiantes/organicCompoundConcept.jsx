import React, { useState } from 'react';
import './assets/css/OrganicCompoundConcept.css'; // CSS para este componente
import Navbar from './navbar'; // Importa el componente Navbar
import Sidebar from './sideBar'; // Importa el componente Sidebar
import img1 from './assets/img/ciencia.avif'; // Cambia la ruta a la imagen correspondiente
import img2 from './assets/img/ciencia.avif'; // Cambia la ruta a la imagen correspondiente
import img3 from './assets/img/ciencia.avif'; // Cambia la ruta a la imagen correspondiente
import organicCompoundBanner from './assets/img/organico.png'; // Cambia la ruta a la imagen correspondiente
import Chat from './chat'; // Importa el componente de chat

const OrganicCompoundConcept = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage(''); // Limpiar el campo de entrada
    }
  };

  return (
    <div>
      {/* Aquí incluimos el Navbar */}
      <Navbar />

      <div className="dashboard-container flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal: descripción de compuestos orgánicos y chat */}
        <div className="flex-1 p-6 bg-white shadow-md rounded-md mr-4">
          <h1 className="text-2xl font-bold mb-4">Compuestos Orgánicos</h1>
          <p className="text-gray-700">
            Los compuestos orgánicos son sustancias químicas que contienen carbono
            en su estructura. Estos compuestos son la base de la química orgánica y
            se encuentran en todos los seres vivos. Generalmente, los compuestos
            orgánicos también contienen hidrógeno, y pueden incluir otros elementos
            como oxígeno, nitrógeno, fósforo y azufre.
          </p>
          <p className="text-gray-700 mt-4">
            Existen diferentes tipos de compuestos orgánicos, como los hidrocarburos,
            alcoholes, ácidos carboxílicos, y muchos otros. Cada uno de ellos tiene
            propiedades químicas únicas y desempeña un papel importante en las
            funciones biológicas y en la industria química.
          </p>
          {/* Banner de compuestos orgánicos */}
          <div className="banner-container">
            <img 
              src={organicCompoundBanner} 
            />
          </div>

          {/* Cartas de química */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="card bg-gray-100 p-4 rounded-lg shadow-md">
              <a href="https://www.cerebriti.com/juegos-de-tecnologia/carbohidratos-argentinas" target="_blank" rel="noopener noreferrer">
                <img src={img1} alt="Química 1" className="w-full h-40 object-cover rounded-md" />
                <h3 className="small-title font-bold mt-2">Carbohidratos Argentinas</h3>
              </a>
            </div>
            <div className="card bg-gray-100 p-4 rounded-lg shadow-md">
              <a href="https://www.cerebriti.com/juegos-de-ciencias/caracteristicas-del-carbono-c" target="_blank" rel="noopener noreferrer">
                <img src={img2} alt="Química 2" className="w-full h-40 object-cover rounded-md" />
                <h3 className="small-title font-bold mt-2">Caracteristicas del carbono c</h3>
              </a>
            </div>
            <div className="card bg-gray-100 p-4 rounded-lg shadow-md">
              <a href="https://www.cerebriti.com/juegos-de-ciencias/test-organico" target="_blank" rel="noopener noreferrer">
                <img src={img3} alt="Química 3" className="w-full h-40 object-cover rounded-md" />
                <h3 className="small-title font-bold mt-2">Test organico</h3>
              </a>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="w-1/3 p-4">
          <Chat /> {/* Aquí llamamos al componente de Chat */}
        </div>
      </div>
    </div>
  );
};

export default OrganicCompoundConcept;
