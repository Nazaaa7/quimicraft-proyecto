import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import Navbar from "../estudiantes/navbar_table";

const PostDetail = ({ post, onBack }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/post?post_id=${post.post_id}`);
      if (!response.ok) {
        throw new Error('Error al cargar comentarios');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
      setError("Error al cargar los comentarios");
    }
  };

  useEffect(() => {
    fetchComments();

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      try {
        const decodedToken = jwt_decode(userData.token);
        setUserId(decodedToken.id.id);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setError("No se pudo verificar el usuario.");
      }
    } else {
      setError("No se encontró el token de usuario.");
    }
  }, [post.post_id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newComment.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }

    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/comments/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          post_id: post.post_id,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el comentario");
      }

      setNewComment("");
      await fetchComments();
      
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      setError("Hubo un error al agregar el comentario. Por favor, intente nuevamente.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el comentario');
        }

        await fetchComments(); // Recargar comentarios después de eliminar
      } catch (error) {
        console.error('Error al eliminar el comentario:', error);
        setError('No se pudo eliminar el comentario');
      }
    }
  };

  const handleUpdateComment = async (commentId, newContent) => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/edit/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newContent,
          is_edited: true
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el comentario');
      }

      await fetchComments(); // Recargar comentarios después de actualizar
    } catch (error) {
      console.error('Error al actualizar el comentario:', error);
      setError('No se pudo actualizar el comentario');
    }
  };  

  return (
    <>
      <Navbar />
      <div className="justify-center flex mt-2">
        <div className="bg-white shadow-md rounded-lg w-8/12 p-6 mb-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">{post.usuario}</h3>
          <h3 className="text-2xl font-bold text-center text-gray-800">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.content}</p>
          <p className="text-gray-500 mt-4"><strong>Categoría:</strong> {post.name}</p>

          <CommentList 
        comments={comments}
        currentUserId={userId}
        onDelete={handleDeleteComment}  // Asegúrate de que estas funciones estén definidas
        onUpdate={handleUpdateComment}  // y pasadas correctamente
      />

          <div className="mt-2">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            {error && (
              <p className="text-red-500 mt-2 text-sm">{error}</p>
            )}
            <button
              onClick={handleCommentSubmit}
              className="mt-2 bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 transition duration-300"
            >
              Enviar Comentario
            </button>
          </div>

          <button
            onClick={onBack}
            className="mt-4 bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Volver a Foro
          </button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;