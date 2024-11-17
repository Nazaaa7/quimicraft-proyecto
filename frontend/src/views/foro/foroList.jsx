import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostDetail from "./PostDetail";
import Navbar from "../estudiantes/navbar_table";
import CreatePost from "./createPost";

const ForoList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);  // Para almacenar los posts filtrados
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [categories, setCategories] = useState([]);  // Para almacenar las categorías disponibles
  const [selectedCategory, setSelectedCategory] = useState("");  // Para el filtro de categoría

  // Cargar publicaciones y categorías
  useEffect(() => {
    const fetchPostsAndCategories = async () => {
      try {
        // Obtener publicaciones con filtro de categoría (si existe)
        const url = selectedCategory
          ? `http://localhost:3000/api/posts?category_id=${selectedCategory}`
          : "http://localhost:3000/api/posts";  // Si no hay categoría, obtenemos todos los posts

        const responsePosts = await fetch(url);
        const dataPosts = await responsePosts.json();
        if (Array.isArray(dataPosts)) {
          setPosts(dataPosts);
          setFilteredPosts(dataPosts);  // Inicialmente, mostramos todos los posts
        } else {
          console.error("La respuesta de la API no es un array", dataPosts);
        }

        // Obtener categorías
        const responseCategories = await fetch("http://localhost:3000/api/posts/categories");
        const dataCategories = await responseCategories.json();
        setCategories(dataCategories);

      } catch (error) {
        console.error("Error al obtener las publicaciones o categorías:", error);
      }
    };

    fetchPostsAndCategories();
  }, [selectedCategory]);  // Dependemos de selectedCategory para cargar los posts con filtro

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setIsCreatePostOpen(false); // Cerrar el formulario cuando se crea una publicación
  };

  const handleCreatePostClick = () => {
    setIsCreatePostOpen(true);
  };

  const handleCloseForm = () => {
    setIsCreatePostOpen(false); // Función para cerrar el formulario
  };

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };

  if (!selectedPost) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Foro</h2>

          <div className="flex justify-between mb-6">
            {/* Filtro por categoría */}
            <div className="flex items-center">
              <label htmlFor="category" className="mr-3 text-lg text-gray-700">Filtrar por Categoría</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón para crear una nueva publicación */}
            <div>
              <button
                onClick={handleCreatePostClick}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Crear Nueva Publicación
              </button>
            </div>
          </div>

          {/* Overlay oscuro */}
          {isCreatePostOpen && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={handleCloseForm}
              ></div>

              {/* Contenedor de CreatePost con animación */}
              <div
                className={`fixed inset-0 flex justify-center items-center z-50 transition-all duration-500 ease-out transform ${
                  isCreatePostOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <CreatePost onPostCreated={handlePostCreated} onClose={handleCloseForm} />
              </div>
            </>
          )}

          {filteredPosts.length === 0 ? (
            <p className="text-gray-600 text-center">No hay publicaciones disponibles.</p>
          ) : (
            filteredPosts.map((post) => (
              <PostItem
                key={post.post_id}
                post={post}
                onClick={() => handlePostSelect(post)}
              />
            ))
          )}
        </div>
      </>
    );
  }

  return <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />;
};

export default ForoList;
