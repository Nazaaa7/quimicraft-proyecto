import React, { useContext, useState, useEffect } from 'react';
import Navbar from './navbar';
import Banner from './banner';
import Sidebar from './sideBar';
import Chat from '../estudiantes/chat';
import { UserContext } from '../../context/UserContext';
import { userType } from '../../context/userTypes';
import { io } from 'socket.io-client';
import './profesores.css'; // Estilos para la notificación

const socket = io('http://localhost:3000');

function Profesor() {
  const { stateDispatch } = useContext(UserContext);
  const [showChat, setShowChat] = useState(false); // Controlar la visibilidad del chat
  const [newMessageAlert, setNewMessageAlert] = useState(false); // Controlar la notificación personalizada
  const [messageData, setMessageData] = useState(null); // Almacenar los datos del mensaje recibido

  // Escuchar mensajes entrantes con socket.io
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      // Mostrar notificación solo si el chat no está abierto
      if (!showChat) {
        setMessageData(message);
        setNewMessageAlert(true);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [showChat]);

  // Manejar el cierre de sesión
  const logOut = () => {
    localStorage.removeItem("userData");
    stateDispatch({ type: userType.logOut });
    window.location.href = "/";
  };

  // Función para ocultar la notificación y mostrar el chat
  const handleNewMessage = () => {
    setShowChat(true);
    setNewMessageAlert(false);
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <Banner />

        {/* Notificación personalizada cuando hay un nuevo mensaje */}
        {newMessageAlert && !showChat && (
          <div className="custom-alert" onClick={handleNewMessage}>
            <p>¡Tienes un nuevo mensaje de un estudiante! Haz clic para verlo.</p>
          </div>
        )}

        {/* Mostrar el chat si está activo */}
        {showChat && (
          <Chat
            onNewMessage={() => setShowChat(true)}
            newMessage={messageData}
            openChat={handleNewMessage}
          />
        )}
      </div>
    </div>
  );
}

export default Profesor;
