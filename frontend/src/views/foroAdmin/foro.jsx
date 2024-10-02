// src/Foro_comentarios.js
import { useState } from 'react';
import "./assets/styles/foro.css";

// Datos de usuarios de ejemplo
const users = [
    { id: 1, name: 'Marcelo Ortega', photo: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Emilio Ortiz', photo: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Alan Riquelme', photo: 'https://via.placeholder.com/40' },
    { id: 4, name: 'Ticiano Vera', photo: 'https://via.placeholder.com/40' },
    { id: 5, name: 'Nazarena Garcia', photo: 'https://via.placeholder.com/40' },
    { id: 6, name: 'Ayelen Alva', photo: 'https://via.placeholder.com/40' },
    { id: 7, name: 'Elon Musk', photo: 'https://via.placeholder.com/40' },
];

// Datos de comentarios iniciales de otros usuarios
const commentsData = [
    { id: 1, userId: 1, text: 'La química orgánica es fundamental para entender cómo se estructuran y comportan las moléculas en nuestro entorno.', likes: [], replies: [] },
    { id: 2, userId: 2, text: 'Me encanta estudiar la termodinámica y cómo se relaciona con la energía en las reacciones químicas.', likes: [], replies: [] },
    { id: 3, userId: 3, text: 'Gran trabajo al abordar la química inorgánica.', likes: [], replies: [] },
    { id: 4, userId: 4, text: 'La química analítica ofrece herramientas esenciales para la identificación de sustancias.', likes: [], replies: [] },
    { id: 5, userId: 5, text: 'El estudio de la química ambiental es cada vez más relevante.', likes: [], replies: [] },
];

// Datos del usuario Roa Lucianno
const roaUser = { id: 8, name: 'Roa Lucianno', photo: 'https://via.placeholder.com/40' };

const Foro_comentarios = () => {
    const [comments, setComments] = useState(commentsData);
    const [replyInput, setReplyInput] = useState({});
    const [subReplyInput, setSubReplyInput] = useState({});
    const [reporting, setReporting] = useState(null);

    const handleLike = (commentId) => {
        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                if (!comment.likes.includes(roaUser.id)) {
                    return { ...comment, likes: [...comment.likes, roaUser.id] };
                }
            }
            return comment;
        }));
    };

    const handleReplyChange = (id, value) => {
        setReplyInput({ ...replyInput, [id]: value });
    };

    const handleReplySubmit = (id) => {
        const replyText = replyInput[id]?.trim(); // Obtenemos el texto del input
        if (replyText) {
            setComments(comments.map(comment =>
                comment.id === id
                    ? {
                        ...comment,
                        replies: [...comment.replies, { userId: roaUser.id, text: replyText, likes: [], subReplies: [] }]
                    }
                    : comment
            ));
            setReplyInput({ ...replyInput, [id]: '' }); // Reiniciar el campo de respuesta
        }
    };

    const handleSubReplyChange = (commentId, replyIndex, value) => {
        setSubReplyInput({ ...subReplyInput, [`${commentId}-${replyIndex}`]: value });
    };

    const handleSubReplySubmit = (commentId, replyIndex) => {
        const subReplyText = subReplyInput[`${commentId}-${replyIndex}`]?.trim(); // Obtenemos el texto del subinput
        if (subReplyText) {
            setComments(comments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.map((reply, index) =>
                            index === replyIndex
                                ? { ...reply, subReplies: [...(reply.subReplies || []), { userId: roaUser.id, text: subReplyText, likes: [] }] }
                                : reply
                        )
                    }
                    : comment
            ));
            setSubReplyInput({ ...subReplyInput, [`${commentId}-${replyIndex}`]: '' }); // Reiniciar el campo de subrespuesta
        }
    };

    const handleSubReplyLike = (commentId, replyIndex) => {
        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: comment.replies.map((reply, index) => {
                        if (index === replyIndex) {
                            if (!reply.likes.includes(roaUser.id)) {
                                return { ...reply, likes: [...reply.likes, roaUser.id] };
                            }
                        }
                        return reply;
                    })
                };
            }
            return comment;
        }));
    };

    const handleReport = (commentId) => {
        setReporting(commentId);
    };

    const handleDelete = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    return (
        <div className="foro-container">
            <div className="foro-comments">
                <h2 className="foro-title">Publicaciones de estudiantes</h2>
                {comments.map(comment => {
                    const user = users.find(u => u.id === comment.userId);
                    return (
                        <div key={comment.id} className="foro-comment">
                            <div className="foro-user-info">
                                <img src={user.photo} alt={user.name} className="foro-user-photo" />
                                <h3>{user.name}</h3>
                            </div>
                            <p>{comment.text}</p>
                            <div className="foro-actions">
                                <button onClick={() => handleLike(comment.id)} className='like'> Like {comment.likes.length}</button>
                                <button onClick={() => setReplyInput({ ...replyInput, [comment.id]: '' })} className='respond'>Responder</button>
                                <button onClick={() => handleReport(comment.id)} className="report-button">Reportar</button>
                                <button onClick={() => handleDelete(comment.id)} className="delete-button">🗑️</button>
                            </div>
                            {replyInput[comment.id] !== undefined && (
                                <div className="foro-reply">
                                    <input
                                        type="text"
                                        value={replyInput[comment.id] || ''}
                                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                        placeholder="Escribe tu respuesta..."
                                    />
                                    <button onClick={() => handleReplySubmit(comment.id)}>Comentar</button>
                                </div>
                            )}
                            {comment.replies.length > 0 && (
                                <div className="foro-replies">
                                    <h4>Respuestas:</h4>
                                    <ul>
                                        {comment.replies.map((reply, index) => {
                                            const replyUser = users.find(u => u.id === reply.userId);
                                            return (
                                                <li key={index}>
                                                    {replyUser && (
                                                        <>
                                                            <img src={replyUser.photo} alt={replyUser.name} className="foro-user-photo-small" />
                                                            <span>{replyUser.name}: {reply.text}</span>
                                                        </>
                                                    )}
                                                    <div className="foro-sub-actions">
                                                        <button onClick={() => handleSubReplyLike(comment.id, index)}>Like</button>
                                                        <button onClick={() => setSubReplyInput({ ...subReplyInput, [`${comment.id}-${index}`]: '' })}>Responder</button>
                                                    </div>
                                                    {subReplyInput[`${comment.id}-${index}`] !== undefined && (
                                                        <div className="foro-sub-reply">
                                                            <input
                                                                type="text"
                                                                value={subReplyInput[`${comment.id}-${index}`] || ''}
                                                                onChange={(e) => handleSubReplyChange(comment.id, index, e.target.value)}
                                                                placeholder="Escribe tu respuesta..."
                                                            />
                                                            <button onClick={() => handleSubReplySubmit(comment.id, index)}>Comentar</button>
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Foro_comentarios;
