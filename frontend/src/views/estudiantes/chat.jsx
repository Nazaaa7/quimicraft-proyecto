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
      setChat((prevChat) => [...prevChat, { ...messageData, sender: messageData.sender || 'other' }]);
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
          return [...prevChat, { ...newMessage, sender: newMessage.sender || 'other' }];
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
        id: socket.id,
        replyTo,
        sender: 'me',
      };

      socket.emit('sendMessage', messageData);
      // No añadimos el mensaje al chat aquí, lo haremos cuando lo recibamos de vuelta
      setMessage('');
      setReplyTo(null);
    }
  };

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
            <div key={index} className={`message ${msg.sender}`}>
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