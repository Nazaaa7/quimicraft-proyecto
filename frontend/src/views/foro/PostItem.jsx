import { useState } from "react";

const PostItem = ({ post, onClick }) => {
  // Convertimos las categorías separadas por comas en un array
  const categories = post.category_names.split(','); 

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

      {/* Contenido */}
      <p className="text-gray-600 text-sm md:text-base mt-2 mb-4 line-clamp-3">
        {post.content}
      </p>

      {/* Detalles */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <p className="flex items-center">
          <strong className="text-gray-700">Categoría:</strong> {categories.join(", ")}
        </p>
        <p className="text-right text-gray-400">
          {/* Agregar la fecha si está disponible */}
          {post.created_at && new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PostItem;
