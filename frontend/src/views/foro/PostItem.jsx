import { useState } from "react";

const PostItem = ({ post, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 hover:border-blue-500 transition duration-300 ease-in-out"
      onClick={() => onClick(post)} // Dispara la acción cuando se hace clic
    >
      <h3 className="text-2xl font-bold text-gray-800">{post.usuario}</h3>
      <h3 className="text-2xl font-bold text-center text-gray-800">{post.title}</h3>
      <p className="text-gray-600 mt-2">{post.content}</p>
      <p className="text-gray-500 mt-4"><strong>Categoría:</strong> {post.name}</p>
    </div>
  );
};

export default PostItem;
