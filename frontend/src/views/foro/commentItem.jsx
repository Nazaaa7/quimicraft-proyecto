// src/components/CommentItem.js
const CommentItem = ({ comment }) => {
  return (
    <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mt-4 rounded-md shadow-sm">
      <p className="text-gray-800 font-medium">{comment.username}:</p>
      <p className="text-gray-600 mt-2">{comment.content}</p>
      <small className="text-gray-400 block mt-2">
        {new Date(comment.created_at).toLocaleString()}
      </small>
    </div>
  );
};

export default CommentItem;
