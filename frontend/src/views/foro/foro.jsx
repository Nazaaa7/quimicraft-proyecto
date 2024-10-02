// src/Foro_comentarios.js
import { useState } from 'react';

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 text-center">Comentarios</h2>
                <div className="flex flex-col space-y-4">
                    {comments.map(comment => {
                        const user = users.find(u => u.id === comment.userId);
                        return (
                            <div key={comment.id} className="bg-white shadow-md rounded-lg p-4">
                                <div className="flex items-center">
                                    <img src={user.photo} alt={user.name} className="rounded-full mr-2" />
                                    <h3 className="font-semibold">{user.name}</h3>
                                </div>
                                <p className="mt-2">{comment.text}</p>
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() => handleLike(comment.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Like {comment.likes.length}
                                    </button>
                                    <button
                                        onClick={() => setReplyInput({ ...replyInput, [comment.id]: '' })}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Responder
                                    </button>
                                    <button
                                        onClick={() => handleReport(comment.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Reportar
                                    </button>
                                </div>
                                {replyInput[comment.id] !== undefined && (
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            value={replyInput[comment.id] || ''}
                                            onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                            placeholder="Escribe tu respuesta..."
                                            className="border rounded-md p-2 w-full"
                                        />
                                        <button
                                            onClick={() => handleReplySubmit(comment.id)}
                                            className="bg-blue-500 text-white rounded-md px-4 py-1 mt-2"
                                        >
                                            Comentar
                                        </button>
                                    </div>
                                )}
                                {comment.replies.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="font-semibold">Respuestas:</h4>
                                        <ul className="list-disc ml-5">
                                            {comment.replies.map((reply, index) => {
                                                const replyUser = users.find(u => u.id === reply.userId);
                                                return (
                                                    <li key={index} className="flex flex-col">
                                                        <div className="flex items-center">
                                                            {replyUser && (
                                                                <>
                                                                    <img src={replyUser.photo} alt={replyUser.name} className="rounded-full w-8 h-8 mr-2" />
                                                                    <span>{replyUser.name}: {reply.text}</span>
                                                                </>
                                                            )}
                                                            <div className="ml-auto flex items-center">
                                                                <button
                                                                    onClick={() => handleSubReplyLike(comment.id, index)}
                                                                    className="text-blue-500 hover:text-blue-700"
                                                                >
                                                                    Like
                                                                </button>
                                                                <span className="ml-1">{reply.likes.length}</span>
                                                                <button
                                                                    onClick={() => setSubReplyInput({ ...subReplyInput, [`${comment.id}-${index}`]: '' })}
                                                                    className="text-blue-500 hover:text-blue-700 ml-2"
                                                                >
                                                                    Responder
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {subReplyInput[`${comment.id}-${index}`] !== undefined && (
                                                            <div className="mt-2 ml-6">
                                                                <input
                                                                    type="text"
                                                                    value={subReplyInput[`${comment.id}-${index}`] || ''}
                                                                    onChange={(e) => handleSubReplyChange(comment.id, index, e.target.value)}
                                                                    placeholder="Escribe tu subrespuesta..."
                                                                    className="border rounded-md p-2 w-full"
                                                                />
                                                                <button
                                                                    onClick={() => handleSubReplySubmit(comment.id, index)}
                                                                    className="bg-blue-500 text-white rounded-md px-4 py-1 mt-2"
                                                                >
                                                                    Comentar
                                                                </button>
                                                            </div>
                                                        )}
                                                        {reply.subReplies && reply.subReplies.length > 0 && (
                                                            <div className="mt-2 ml-6">
                                                                <h5 className="font-semibold">Sub-respuestas:</h5>
                                                                <ul className="list-disc ml-5">
                                                                    {reply.subReplies.map((subReply, subIndex) => {
                                                                        const subReplyUser = users.find(u => u.id === subReply.userId);
                                                                        return (
                                                                            <li key={subIndex} className="flex items-center">
                                                                                {subReplyUser && (
                                                                                    <>
                                                                                        <img src={subReplyUser.photo} alt={subReplyUser.name} className="rounded-full w-8 h-8 mr-2" />
                                                                                        <span>{subReplyUser.name}: {subReply.text}</span>
                                                                                    </>
                                                                                )}
                                                                                <div className="ml-auto flex items-center">
                                                                                    <button
                                                                                        onClick={() => handleSubReplyLike(comment.id, index)}
                                                                                        className="text-blue-500 hover:text-blue-700"
                                                                                    >
                                                                                        Like
                                                                                    </button>
                                                                                    <span className="ml-1">{subReply.likes.length}</span>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                                {reporting === comment.id && (
                                    <div className="mt-2 text-red-600">
                                        Este comentario ha sido reportado.
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Foro_comentarios;
