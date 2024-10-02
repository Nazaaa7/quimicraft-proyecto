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

// Datos iniciales de comentarios
const commentsData = [
    { id: 1, userId: 1, text: 'La química orgánica es fundamental para entender cómo se estructuran y comportan las moléculas en nuestro entorno.', likes: [], replies: [] },
    { id: 2, userId: 2, text: 'Me encanta estudiar la termodinámica y cómo se relaciona con la energía en las reacciones químicas.', likes: [], replies: [] },
    { id: 3, userId: 3, text: 'Gran trabajo al abordar la química inorgánica.', likes: [], replies: [] },
    { id: 4, userId: 4, text: 'La química analítica ofrece herramientas esenciales para la identificación de sustancias.', likes: [], replies: [] },
    { id: 5, userId: 5, text: 'El estudio de la química ambiental es cada vez más relevante.', likes: [], replies: [] },
];

// Datos del usuario Roa Lucianno
const roaUser = { id: 8, name: 'Roa Lucianno', photo: 'https://via.placeholder.com/40' };

const ForoProf = () => {
    const [comments, setComments] = useState(commentsData);
    const [newComment, setNewComment] = useState('');
    const [replyInput, setReplyInput] = useState({});
    const [subReplyInput, setSubReplyInput] = useState({});

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const newCommentData = {
                id: comments.length + 1,
                userId: roaUser.id,
                text: newComment,
                likes: [],
                replies: [],
            };
            setComments([...comments, newCommentData]);
            setNewComment(''); // Reiniciar el campo de entrada
        }
    };

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

    return (
        <div className="foro-container">
            <h2 className="foro-title">Publicaciones</h2>
            <div className="new-comment">
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Escribe un nuevo comentario..."
                    className="comment-input"
                />
                <button
                    onClick={handleCommentSubmit}
                    className="comment-submit"
                >
                    Publicar
                </button>
            </div>
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
                                <button
                                    onClick={() => handleLike(comment.id)}
                                    className="comment-like"
                                >
                                    Like {comment.likes.length}
                                </button>
                                <button
                                    onClick={() => setReplyInput({ ...replyInput, [comment.id]: '' })}
                                    className="comment-reply"
                                >
                                    Responder
                                </button>
                            </div>
                            {replyInput[comment.id] !== undefined && (
                                <div className="reply-input">
                                    <input
                                        type="text"
                                        value={replyInput[comment.id] || ''}
                                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                        placeholder="Escribe tu respuesta..."
                                        className="comment-reply-input"
                                    />
                                    <button
                                        onClick={() => handleReplySubmit(comment.id)}
                                        className="reply-submit"
                                    >
                                        Comentar
                                    </button>
                                </div>
                            )}
                            {comment.replies.length > 0 && (
                                <div className="replies-section">
                                    <h4 className="replies-title">Respuestas:</h4>
                                    <ul className="replies-list">
                                        {comment.replies.map((reply, index) => {
                                            const replyUser = users.find(u => u.id === reply.userId);
                                            return (
                                                <li key={index} className="reply-item">
                                                    <div className="reply-header">
                                                        {replyUser && (
                                                            <>
                                                                <img src={replyUser.photo} alt={replyUser.name} className="reply-user-photo" />
                                                                <span className="reply-user-name">{replyUser.name}: {reply.text}</span>
                                                            </>
                                                        )}
                                                        <div className="reply-actions">
                                                            <button
                                                                onClick={() => handleSubReplyLike(comment.id, index)}
                                                                className="reply-like"
                                                            >
                                                                Like
                                                            </button>
                                                            <span className="reply-like-count">{reply.likes.length}</span>
                                                            <button
                                                                onClick={() => setSubReplyInput({ ...subReplyInput, [`${comment.id}-${index}`]: '' })}
                                                                className="reply-subreply"
                                                            >
                                                                Responder
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {subReplyInput[`${comment.id}-${index}`] !== undefined && (
                                                        <div className="subreply-input">
                                                            <input
                                                                type="text"
                                                                value={subReplyInput[`${comment.id}-${index}`] || ''}
                                                                onChange={(e) => handleSubReplyChange(comment.id, index, e.target.value)}
                                                                placeholder="Escribe tu subrespuesta..."
                                                                className="comment-subreply-input"
                                                            />
                                                            <button
                                                                onClick={() => handleSubReplySubmit(comment.id, index)}
                                                                className="subreply-submit"
                                                            >
                                                                Comentar
                                                            </button>
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

export default ForoProf;
