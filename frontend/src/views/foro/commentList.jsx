// src/components/CommentList.js
import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  // Aseguramos que 'comments' sea siempre un array
  if (!Array.isArray(comments)) {
    comments = [];  // Si no es un array, asignamos un array vacío
  }

  return (
    <div className="mt-6">
      <h4 className="text-xl font-semibold text-center text-gray-800">Comentarios</h4>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center">No hay comentarios aún.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.comment_id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentList;
