import React, { useContext, useState, useEffect } from 'react';
import Navbar from './navbar';
import Banner from './banner';
import ForoProf from '../foro/foroProf';
import { UserContext } from '../../context/UserContext';
import { userType } from '../../context/userTypes';
import Chat from '../estudiantes/chat';
import { io } from 'socket.io-client';
import './profesores.css'; // Estilos para la notificación

const socket = io('http://localhost:3000');

const initialComments = [
  { id: 1, userId: 1, text: 'La química orgánica es fundamental para entender cómo se estructuran y comportan las moléculas en nuestro entorno.', likes: [], replies: [] },
  // ... otros comentarios iniciales
];

function Profesor() {
  const { stateDispatch } = useContext(UserContext);
  const [activeForo, setActiveForo] = useState(''); // Para controlar la sección activa
  const [comments, setComments] = useState(initialComments); // Comentarios del foro
  const [showChat, setShowChat] = useState(false); // Controlar la visibilidad del chat
  const [newMessageAlert, setNewMessageAlert] = useState(false); // Controlar la notificación personalizada
  const [messageData, setMessageData] = useState(null); // Almacenar los datos del mensaje recibido

  // Escuchar mensajes entrantes con socket.io
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessageData(message); // Guardar el mensaje recibido
      setNewMessageAlert(true); // Activar la notificación
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // Manejar la creación de un nuevo post en el foro
  const handleNewPost = (newPost) => {
    setComments((prevComments) => [newPost, ...prevComments]);
  };

  // Manejar las respuestas a comentarios en el foro
  const handleReply = (commentId, replyText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...comment.replies, { id: new Date().getTime(), userId: 1, text: replyText }],
            }
          : comment
      )
    );
  };

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
    <div className="App">
      <div>
        <Navbar setActiveForo={setActiveForo} />
        <Banner onNewPost={handleNewPost} />

        {/* Notificación personalizada cuando hay un nuevo mensaje */}
        {newMessageAlert && (
          <div className="custom-alert" onClick={handleNewMessage}>
            <p>¡Tienes un nuevo mensaje de {messageData?.sender || "un estudiante"}! Haz clic para verlo.</p>
          </div>
        )}

        {/* Renderizar la vista según la sección activa */}
        {activeForo === 'profesores' ? (
          <ForoProf comments={comments} onReply={handleReply} />
        ) : activeForo === 'consultas' || showChat ? (
          <Chat onNewMessage={() => setShowChat(true)} />
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Selecciona una sección para ver el contenido.</p>
        )}
      </div>
    </div>
  );
}

export default Profesor;
