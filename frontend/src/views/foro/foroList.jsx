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
  const [userRole, setUserRole] = useState(null);
  const [likedFirst, setLikedFirst] = useState(false); // Para activar/desactivar el filtro de "likeados primero"
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de publicaciones y categorías


  // Obtener el ID del usuario del localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      try {
        const decodedToken = jwt_decode(userData.token);
        setUserId(decodedToken.id.id);
        setUserRole(userData.role); // Añadir esto para obtener el rol del usuario
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
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchPostsAndCategories();
  }, [selectedCategory]);

  const handleDeleteSelectedPost = async () => {
    if (!selectedPost) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/posts/eliminar/${selectedPost.post_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Eliminar el post de los estados
        setPosts((prevPosts) => prevPosts.filter(post => post.post_id !== selectedPost.post_id));
        setFilteredPosts((prevPosts) => prevPosts.filter(post => post.post_id !== selectedPost.post_id));
        setSelectedPost(null); // Volver a la lista de posts
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el post:", errorData);
        alert("No se pudo eliminar la publicación. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      alert("Ocurrió un error al intentar eliminar la publicación.");
    }
  };

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

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/eliminar/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Eliminar el post de los estados
        setPosts((prevPosts) => prevPosts.filter(post => post.post_id !== postId));
        setFilteredPosts((prevPosts) => prevPosts.filter(post => post.post_id !== postId));
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el post:", errorData);
        alert("No se pudo eliminar la publicación. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      alert("Ocurrió un error al intentar eliminar la publicación.");
    }
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
  const handleCreatePostClick = () => {
    setIsCreatePostOpen(true);
  };

  const handleCloseForm = () => {
    setIsCreatePostOpen(false);
  };

  const handlePostCreated = async (newPost) => {  
    try {  
      // Fetch full post details including likes count  
      const likesResponse = await fetch(  
        `http://localhost:3000/api/likes/${newPost.post_id}/likes_count`,  
        {  
          headers: {  
            "Cache-Control": "no-cache",  
            "Content-Type": "application/json"  
          }  
        }  
      );  
      const likesData = await likesResponse.json();  
  
      const completePost = {  
        ...newPost,  
        likes_count: likesData.likes_count  
      };  
  
      // Usar función de actualización para garantizar la inmutabilidad  
      setPosts((prevPosts) => [completePost, ...prevPosts]);  
      
      // Cerrar el formulario de creación  
      setIsCreatePostOpen(false);  
    } catch (error) {  
      console.error("Error fetching post details:", error);  
    }  
  };  
  
  // Efecto para manejar la actualización de posts  
  useEffect(() => {  
    // Aplicar sorting y filtrado cada vez que cambian los posts  
    const sortedPosts = sortPosts(posts);  
    setFilteredPosts(sortedPosts);  
  }, [posts, likedPosts, likedFirst]);
  useEffect(() => {
    const sortedPosts = sortPosts(posts);
    setFilteredPosts(sortedPosts);
  }, [posts, likedPosts, likedFirst]); // Este efecto se activará cada vez que posts, likedPosts o likedFirst cambien
  
  

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };
  
  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onPostCreated={handlePostCreated}
        renderAdminDelete={
          userRole === "admin" && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleDeleteSelectedPost}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Eliminar Publicación
              </button>
            </div>
          )
        }
      />
    );
  }
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
              <div className="mb-1">
            <button
              onClick={handleLikedFirstClick}
              className={`p-2 ml-4 rounded-md transition-colors duration-300 ${likedFirst ? "bg-green-400 text-white" : "bg-gray-400 text-gray-700"}`}
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

          
         
          {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 mr-2 w-10 border-b-4 border-green-500"></div>
            <div className="text-2xl font-bold tracking-wide flex items-center text-green-700">cargando publicaciones...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
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
              userId={userId}  
              handleDeletePost={handleDeletePost}  
            />
          ))
        )}
          

          {/* Animated Overlay for CreatePost */}
          {isCreatePostOpen && (
            <div 
              className="fixed w-100 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
                         animate-fade-in"
            >

                <button 
                  onClick={handleCloseForm} 
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
                <CreatePost 
                onPostCreated={handlePostCreated}
                onClose={handleCloseForm}
                />  

            </div>
          )}
        </div>
      </>
    );
  }

export default ForoList;
