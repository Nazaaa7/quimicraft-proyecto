import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import './assets/css/chat.css';

const socket = io('http://localhost:3000');
const Chat = ({ onNewMessage, newMessage, openChat }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const newMessageRef = useRef(null);

  useEffect(() => {
    socket.on('receiveMessage', (messageData) => {
      // Verificar si el mensaje recibido es del propio usuario
      const isMyMessage = messageData.id === socket.id;
      setChat((prevChat) => [
        ...prevChat,
        { ...messageData, sender: isMyMessage ? 'me' : 'other' } // Asignar la clase correctamente
      ]);
      onNewMessage(messageData);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [onNewMessage]);

  useEffect(() => {
    if (newMessage && newMessage !== newMessageRef.current) {
      newMessageRef.current = newMessage;
      setChat((prevChat) => {
        if (!prevChat.some(msg => msg.id === newMessage.id)) {
          const isMyMessage = newMessage.id === socket.id;
          return [
            ...prevChat,
            { ...newMessage, sender: isMyMessage ? 'me' : 'other' } // Asignar la clase correctamente
          ];
        }
        return prevChat;
      });
      openChat();
    }
  }, [newMessage, openChat]);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        message,
        id: socket.id, // Usar el ID del socket para identificar al usuario
        replyTo,
        sender: 'me',
      };

      socket.emit('sendMessage', messageData);
      setMessage('');
      setReplyTo(null);
    }
  };

  return (
    <div className="chat-container">
      <h2>Consultas</h2>
      <div className="chat-box">
        {chat.length === 0 ? (
          <p className="empty-message">No hay mensajes. Sé el primero en preguntar algo.</p>
        ) : (
          chat.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.replyTo && (
                <div className="reply">
                  Respondiendo a: {chat.find((m) => m.id === msg.replyTo)?.message || 'Mensaje eliminado'}
                </div>
              )}
              {msg.message}
              <button className="reply-button" onClick={() => setReplyTo(msg.id)}>
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