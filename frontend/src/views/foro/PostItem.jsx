import { ThumbsUp, ThumbsDown } from "lucide-react";  // Asumiendo que importas los iconos de Lucid

const PostItem = ({ post, onClick, likedPosts, handleLike, handleUnlike }) => {
  // Convertimos las categorías separadas por comas en un array
  const categories = post.category_names.split(",");

  // Comprobamos si este post está "liked" por el usuario
  const isLiked = likedPosts.has(post.post_id);

  // Formatear la fecha de creación del post
  const formattedDate = new Date(post.created_at).toLocaleDateString("es-ES", {
    weekday: "short", // Día de la semana (ejemplo: lun, mar)
    year: "numeric", // Año completo
    month: "short",  // Mes abreviado (ejemplo: Ene, Feb)
    day: "numeric",  // Día del mes
  });

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200 hover:border-green-400 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105"
      onClick={() => onClick(post)} // Dispara la acción cuando se hace clic
    >
      <div className="flex justify-between items-center mb-4">
        {/* Nombre del usuario */}
        <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-200">
          {post.usuario}
        </h3>

        {/* Categorías en un pequeño tag */}
        <div className="flex gap-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold text-white bg-green-300 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Título */}
      <h3 className="text-3xl font-bold text-center text-gray-800 hover:text-green-600 transition-colors duration-200 mb-3">
        {post.title}
      </h3>

      {/* Fecha de creación */}
      <p className="text-sm text-gray-500 text-center mb-3">{formattedDate}</p>

      {/* Contenido */}
      <p className="text-gray-600 text-sm md:text-base mt-2 mb-4 line-clamp-3">
        {post.content}
      </p>

      {/* Mostrar la cantidad de likes */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Likes: {post.likes_count || 0}
        </p>

        {/* Botón de Like */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Para evitar que se dispare el onClick del post
            if (isLiked) {
              handleUnlike(post.post_id); // Si ya está likeado, eliminar like
            } else {
              handleLike(post.post_id); // Si no está likeado, agregar like
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
