import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostDetail from "./PostDetail";
import Navbar from "../estudiantes/navbar_table";
import CreatePost from "./createPost";

const ForoList = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userId, setUserId] = useState(null);
  const [likedFirst, setLikedFirst] = useState(false); // Para activar/desactivar el filtro de "likeados primero"

  // Obtener el ID del usuario del localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      try {
        const decodedToken = jwt_decode(userData.token);
        setUserId(decodedToken.id.id);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  // Obtener los likes del usuario cuando se tenga el userId
  useEffect(() => {
    const fetchUserLikes = async () => {
      if (!userId) return;
      
      try {
        const response = await fetch(`http://localhost:3000/api/likes/user/${userId}`, {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
          }
        });
        
        if (response.ok) {
          const userLikes = await response.json();
          // Suponiendo que la API devuelve un array de objetos con post_id
          const likedPostIds = new Set(userLikes.map(like => like.post_id));
          setLikedPosts(likedPostIds);
        }
      } catch (error) {
        console.error("Error al obtener los likes del usuario:", error);
      }
    };

    fetchUserLikes();
  }, [userId]);

  // Cargar posts y categorías
  useEffect(() => {
    const fetchPostsAndCategories = async () => {
      try {
        const url = selectedCategory
          ? `http://localhost:3000/api/posts?category_id=${selectedCategory}`
          : "http://localhost:3000/api/posts";

        const responsePosts = await fetch(url);
        const dataPosts = await responsePosts.json();
        
        if (Array.isArray(dataPosts)) {
          const postsWithLikes = await Promise.all(
            dataPosts.map(async (post) => {
              const likesResponse = await fetch(
                `http://localhost:3000/api/likes/${post.post_id}/likes_count`,
                {
                  headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json"
                  }
                }
              );
              const likesData = await likesResponse.json();
              return {
                ...post,
                likes_count: likesData.likes_count
              };
            })
          );

          setPosts(postsWithLikes);
          setFilteredPosts(postsWithLikes);
        }

        const responseCategories = await fetch("http://localhost:3000/api/posts/categories");
        const dataCategories = await responseCategories.json();
        setCategories(dataCategories);
      } catch (error) {
        console.error("Error al obtener las publicaciones o categorías:", error);
      }
    };

    fetchPostsAndCategories();
  }, [selectedCategory]);

  const handleLike = async (postId) => {
    if (!userId) return;

    try {
      const response = await fetch("http://localhost:3000/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          user_id: userId,
        }),
      });

      if (response.ok) {
        setLikedPosts((prev) => new Set(prev.add(postId)));
        
        const likesResponse = await fetch(
          `http://localhost:3000/api/likes/${postId}/likes_count`,
          {
            headers: {
              "Cache-Control": "no-cache",
              "Content-Type": "application/json"
            }
          }
        );
        const likesData = await likesResponse.json();

        // Actualizar ambos estados de posts
        const updatePosts = (prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? { ...post, likes_count: likesData.likes_count }
              : post
          );

        setPosts(updatePosts);
        setFilteredPosts(updatePosts);
      }
    } catch (error) {
      console.error("Error al agregar like:", error);
    }
  };

  const handleUnlike = async (postId) => {
    if (!userId) return;

    try {
      const response = await fetch("http://localhost:3000/api/likes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          user_id: userId,
        }),
      });

      if (response.ok) {
        setLikedPosts((prev) => {
          const newLikedPosts = new Set(prev);
          newLikedPosts.delete(postId);
          return newLikedPosts;
        });

        const likesResponse = await fetch(
          `http://localhost:3000/api/likes/${postId}/likes_count`,
          {
            headers: {
              "Cache-Control": "no-cache",
              "Content-Type": "application/json"
            }
          }
        );
        const likesData = await likesResponse.json();

        // Actualizar ambos estados de posts
        const updatePosts = (prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? { ...post, likes_count: likesData.likes_count }
              : post
          );

        setPosts(updatePosts);
        setFilteredPosts(updatePosts);
      }
    } catch (error) {
      console.error("Error al eliminar like:", error);
    }
  };

  // Función para ordenar las publicaciones por fecha y likes
  const sortPosts = (postsToSort) => {
    const sortedPosts = postsToSort.sort((a, b) => {
      if (likedFirst) {
        // Primero, aseguramos que las publicaciones que el usuario ha "likeado" se muestren primero
        const isLikedA = likedPosts.has(a.post_id);
        const isLikedB = likedPosts.has(b.post_id);
        if (isLikedA === isLikedB) {
          // Si ambas publicaciones tienen el mismo estado de like, ordenamos por fecha
          return new Date(b.created_at) - new Date(a.created_at); // Orden descendente por fecha
        }
        return isLikedB - isLikedA; // Si uno tiene like y el otro no, ponemos primero el que tiene like
      } else {
        // Si no está activado el filtro de "likeados primero", ordenamos solo por fecha
        return new Date(b.created_at) - new Date(a.created_at); // Orden descendente por fecha
      }
    });

    return sortedPosts;
  };

  useEffect(() => {
    const sortedPosts = sortPosts(posts);
    setFilteredPosts(sortedPosts);
  }, [posts, likedPosts, likedFirst]); // Se aplica el filtro cuando cambian estos estados

  // Manejo del botón "Likeados Primero"
  const handleLikedFirstClick = () => {
    setLikedFirst((prev) => !prev); // Cambiar el estado de likedFirst (activado/desactivado)
  };

  // Manejar la creación de un nuevo post
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setIsCreatePostOpen(false);
  };

  const handleCreatePostClick = () => {
    setIsCreatePostOpen(true);
  };

  const handleCloseForm = () => {
    setIsCreatePostOpen(false);
  };

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };
  
  // Renderizar el componente
  if (!selectedPost) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Foro</h2>

          <div className="flex justify-between mb-6">
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
              <div className="mb-6">
            <button
              onClick={handleLikedFirstClick}
              className={`p-2 rounded-md transition-colors duration-300 ${likedFirst ? "bg-green-400 text-white" : "bg-gray-400 text-gray-700"}`}
            >
              Likeados Primero
            </button>
          </div>
            </div>

            <div>
              <button
                onClick={handleCreatePostClick}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Crear Nueva Publicación
              </button>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <p className="text-gray-600 text-center">No hay publicaciones disponibles.</p>
          ) : (
            filteredPosts.map((post) => (
              <PostItem
                key={post.post_id}
                post={post}
                onClick={() => handlePostSelect(post)}
                likedPosts={likedPosts}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
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
