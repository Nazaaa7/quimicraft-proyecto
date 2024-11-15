import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostDetail from "./PostDetail";  // Importamos el componente para mostrar el detalle del post
import Navbar from "../estudiantes/navbar_table";
import CreatePost from "./createPost";  // Importamos el componente para crear publicaciones

const ForoList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Estado para manejar el post seleccionado
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);  // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(data);
          console.log("Publicaciones obtenidas:", data);
        } else {
          console.error("La respuesta de la API no es un array", data);
        }
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
      }
    };

    fetchPosts();
  }, []);

  // Función para agregar una nueva publicación sin recargar la página
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);  // Agregar la nueva publicación al inicio
    setIsCreatePostOpen(false); // Cerrar el formulario al crear la publicación
  };

  // Función para abrir el formulario de crear publicación
  const handleCreatePostClick = () => {
    setIsCreatePostOpen(true); // Mostrar el formulario
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setIsCreatePostOpen(false); // Ocultar el formulario
  };

  // Función para manejar la selección de una publicación
  const handlePostSelect = (post) => {
    setSelectedPost(post); // Actualizar el post seleccionado
  };

  // Si no hay post seleccionado, mostramos la lista de publicaciones
  if (!selectedPost) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Foro</h2>

          {/* Botón para abrir el formulario */}
          <div className="text-center mb-6">
            <button
              onClick={handleCreatePostClick}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Crear Nueva Publicación
            </button>
          </div>

          {/* Overlay oscuro */}
          {isCreatePostOpen && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={handleCloseForm}  // Cerrar el formulario si se hace clic fuera de él
              ></div>

              {/* Formulario centrado */}
              <div className="fixed inset-0 flex justify-center items-center z-50">
                <CreatePost onPostCreated={handlePostCreated} />
              </div>
            </>
          )}

          {/* Mostrar las publicaciones existentes */}
          {posts.length === 0 ? (
            <p className="text-gray-600 text-center">No hay publicaciones disponibles.</p>
          ) : (
            posts.map((post) => (
              <PostItem
                key={post.post_id}
                post={post}
                onClick={() => handlePostSelect(post)} // Se selecciona la publicación al hacer clic
              />
            ))
          )}
        </div>
      </>
    );
  }

  // Si hay un post seleccionado, mostramos el detalle
  return (
    <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
  );
};

export default ForoList;
