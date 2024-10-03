import React, { useState } from 'react';
import "./assets/styles/foro.css";

// Datos de usuarios de ejemplo
const users = [
  { id: 1, name: 'Marcelo Ortega', photo: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Emilio Ortiz', photo: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Alan Riquelme', photo: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Ticiano Vera', photo: 'https://via.placeholder.com/40' },
  { id: 5, name: 'Luciano Roa', photo: 'https://via.placeholder.com/40' },
  { id: 6, name: 'Ayelen Alva', photo: 'https://via.placeholder.com/40' },
  { id: 7, name: 'Elon Musk', photo: 'https://via.placeholder.com/40' },
  { id: 8, name: 'Naza Garcia', photo: 'https://via.placeholder.com/40' },
];

const ForoProf = ({ comments, onReply }) => {
  const [replyText, setReplyText] = useState(''); // Estado para almacenar la respuesta
  const [activeReplyId, setActiveReplyId] = useState(null); // Estado para controlar qué comentario está respondiendo

  return (
    <div className="foro-container">
      <h2 className="foro-title">Publicaciones</h2>
      <div className="comments-list">
        {comments.map(comment => {
          const user = users.find(u => u.id === comment.userId);
          return (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <img src={user.photo} alt={user.name} className="comment-user-photo" />
                <h3 className="comment-user-name">{user.name}</h3>
              </div>
              <p className="comment-text">{comment.text}</p>
              <div className="comment-actions">
                <button className="comment-like">Like {comment.likes.length}</button>
                <button className='respond' onClick={() => setActiveReplyId(comment.id)}>Responder</button>
              </div>

              {/* Mostrar respuestas si existen */}
              {comment.replies.length > 0 && (
                <div className="replies-section">
                  {comment.replies.map((reply, index) => {
                    const replyUser = users.find(u => u.id === reply.userId);
                    return (
                      <div key={index} className="reply-card">
                        <div className="reply-header">
                          <img src={replyUser.photo} alt={replyUser.name} className="reply-user-photo" />
                          <h4 className="reply-user-name">{replyUser.name}</h4>
                        </div>
                        <p className="reply-text">{reply.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Mostrar el formulario de respuesta solo si el comentario es el que se está respondiendo */}
              {activeReplyId === comment.id && (
                <div className="reply-form">
                  <textarea
                    placeholder="Escribe tu respuesta..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      onReply(comment.id, replyText); // Llamar a la función de respuesta
                      setReplyText(''); // Limpiar el textarea
                      setActiveReplyId(null); // Cerrar el formulario de respuesta
                    }}
                  >
                    Enviar Respuesta
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForoProf;
