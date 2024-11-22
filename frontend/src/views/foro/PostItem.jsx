import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";

const PostItem = ({ 
  post, 
  onClick, 
  likedPosts, 
  handleLike, 
  handleUnlike, 
  userId,
  userRole,  // Agregar userRole
  handleDeletePost 
}) => {
  // Convertimos las categorías separadas por comas en un array
const categories = post.category_names ? post.category_names.split(",") : [];
  // Comprobamos si este post está "liked" por el usuario
  const isLiked = likedPosts.has(post.post_id);
  console.log(userRole)
  console.log(userId)

  // Verificamos si el usuario actual es el dueño del post
  const isPostOwner = userId === post.user_id;

  // Formatear la fecha de creación del post
  const formattedDate = new Date(post.created_at).toLocaleDateString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
      handleDeletePost(post.post_id);
    }
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200 hover:border-green-400 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105"
      onClick={() => onClick(post)}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-200">
          {post.usuario}
        </h3>

        <div className="flex gap-2 items-center">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold text-white bg-green-300 rounded-full"
            >
              {category}
            </span>
          ))}
          
          {/* Botón de eliminar solo visible para el dueño del post */}
          {isPostOwner && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
              title="Eliminar publicación"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      <h3 className="text-3xl font-bold text-center text-gray-800 hover:text-green-600 transition-colors duration-200 mb-3">
        {post.title}
      </h3>

      <p className="text-sm text-gray-500 text-center mb-3">{formattedDate}</p>

      <p className="text-gray-600 text-sm md:text-base mt-2 mb-4 line-clamp-3">
        {post.content}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Likes: {post.likes_count || 0}
        </p>
        {userRole === "admin" && (
       <button
       onClick={handleDelete}
       className="text-red-500 border p-2 rounded-md ml-8 border-red-600 bg-red-200 hover:text-red-700 justify-between flex transition-colors duration-300 hover:bg-red-400"
       title="Eliminar publicación"
       aria-label="Eliminar publicación"
     >
       <Trash2 size={20} />Eliminar publicacion
     </button>
      )}
      


        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isLiked) {
              handleUnlike(post.post_id);
            } else {
              handleLike(post.post_id);
            }
          }}
          className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-300 ${isLiked ? "text-blue-300" : "text-gray-500"} hover:text-blue-600`}
        >
          {isLiked ? (
            <ThumbsDown className="text-xl" />
          ) : (
            <ThumbsUp className="text-xl" />
          )}
          <span>{isLiked ? "Unlike" : "Like"}</span>
        </button>
      </div>
    </div>
  );
};

export default PostItem;