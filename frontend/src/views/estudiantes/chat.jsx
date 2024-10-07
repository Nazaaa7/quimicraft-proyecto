import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import './assets/css/chat.css'; // Asegúrate de importar el archivo CSS

const socket = io('http://localhost:3000');

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [replyTo, setReplyTo] = useState(null); // Estado para la respuesta

  useEffect(() => {
    socket.on('receiveMessage', (messageData) => {
      setChat((prevChat) => [...prevChat, messageData]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        message,
        id: socket.id,
        replyTo: replyTo, // Incluimos el mensaje al que se responde
      };

      socket.emit('sendMessage', messageData);
      setMessage(''); // Limpiamos el mensaje
      setReplyTo(null); // Resetear la respuesta
    }
  };

  const handleReply = (messageId) => {
    setReplyTo(messageId); // Asigna el ID del mensaje al que se va a responder
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
              {/* Muestra el mensaje al que se está respondiendo si existe */}
              {msg.replyTo && (
                <div className="reply">
                  Respondiendo a: {chat.find((m) => m.id === msg.replyTo)?.message || 'Mensaje eliminado'}
                </div>
              )}
              {msg.message}
              {/* Botón para responder */}
              <button className="reply-button" onClick={() => handleReply(msg.id)}>
                <FontAwesomeIcon icon={faReply} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Muestra el mensaje al que se está respondiendo */}
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
}

export default Chat;
