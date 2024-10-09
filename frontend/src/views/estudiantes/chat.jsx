import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import './assets/css/chat.css'; // Asegúrate de importar el archivo CSS

const socket = io('http://localhost:3000');

const Chat = ({ onNewMessage, openChat }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  // Efecto para recibir mensajes por socket
  useEffect(() => {
    socket.on('receiveMessage', (messageData) => {
      // Verificar si el mensaje ya está en el chat
      setChat((prevChat) => {
        const isDuplicate = prevChat.some((msg) => msg.id === messageData.id && msg.message === messageData.message);
        if (!isDuplicate) {
          return [...prevChat, messageData];
        }
        return prevChat;
      });
      onNewMessage(messageData); // Notificar que hay un nuevo mensaje
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [onNewMessage]);

  // Función para enviar mensajes
  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        message,
        id: socket.id,
        replyTo,
      };

      socket.emit('sendMessage', messageData);
      setMessage(''); // Limpiar el mensaje
      setReplyTo(null); // Limpiar la respuesta
    }
  };

  // Función para manejar respuestas
  const handleReply = (messageId) => {
    setReplyTo(messageId);
  };

  return (
    <div className="chat-container">
      <h2>Consultas</h2>
      <div className="chat-box">
        {chat.length === 0 ? (
          <p className="empty-message">No hay mensajes. Sé el primero en preguntar algo.</p>
        ) : (
          chat.map((msg, index) => (
            <div key={index} className="message">
              {msg.replyTo && (
                <div className="reply">
                  Respondiendo a: {chat.find((m) => m.id === msg.replyTo)?.message || 'Mensaje eliminado'}
                </div>
              )}
              {msg.message}
              <button className="reply-button" onClick={() => handleReply(msg.id)}>
                <FontAwesomeIcon icon={faReply} />
              </button>
            </div>
          ))
        )}
      </div>
      {replyTo && (
        <div className="replying-to">
          Respondiendo a: {chat.find((m) => m.id === replyTo)?.message || 'Mensaje eliminado'}
        </div>
      )}

      <div className="input-group">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
