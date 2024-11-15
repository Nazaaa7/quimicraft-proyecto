import { useState, useEffect } from "react";
import CommentList from "./CommentList";  // Componente para listar comentarios
import Navbar from "../estudiantes/navbar_table";

const PostDetail = ({ post, onBack }) => {
  const [comments, setComments] = useState([]);  // Comentarios de la publicación
  const [newComment, setNewComment] = useState("");  // Nuevo comentario
  const [error, setError] = useState("");  // Errores al agregar comentario

  useEffect(() => {
    // Función para cargar los comentarios cuando se selecciona un post
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/comments/post?post_id=${post.post_id}`);
        const data = await response.json();
        setComments(data);  // Establecer los comentarios
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    };

    fetchComments();
  }, [post.post_id]);

  // Manejar el envío de un nuevo comentario
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData ? userData.id : null;  // Obtener el ID del usuario

    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/comments", {
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

      const addedComment = await response.json();
      setComments((prevComments) => [addedComment, ...prevComments]);
      setNewComment("");  // Limpiar el campo de texto
      setError("");  // Limpiar cualquier error
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      setError("Hubo un error al agregar el comentario.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="justify-center flex mt-2">
    <div className="bg-white shadow-md rounded-lg w-8/12 p-6 mb-6 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800">{post.usuario}</h3>
      <h3 className="text-2xl font-bold text-center text-gray-800">{post.title}</h3>
      <p className="text-gray-600 mt-2">{post.content}</p>
      <p className="text-gray-500 mt-4"><strong>Categoría:</strong> {post.name}</p>

      {/* Comentarios */}
      <CommentList comments={comments} />

      {/* Formulario para agregar un nuevo comentario */}
      <div className="mt-2">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={handleCommentSubmit}
          className="mt-2 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Enviar Comentario
        </button>
      </div>

      {/* Volver a la lista de publicaciones */}
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
