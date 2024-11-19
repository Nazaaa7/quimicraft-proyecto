import { useState } from 'react';

const CommentItem = ({ 
  comment, 
  currentUserId, 
  onDelete, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  // Convertir los valores a números antes de compararlos
  const isOwner = currentUserId && comment.id && parseInt(currentUserId) === parseInt(comment.id);
  console.log(currentUserId)
  console.log(comment.id)
  console.log(comment)

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    if (editedContent.trim() === "") return;
    
    try {
      await onUpdate(comment.comment_id, editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(comment.comment_id);
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };
  return (
    <div className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-l-4 border-green-400 p-3 mt-3 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-sm font-medium">
              {comment.usuario.charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="text-gray-800 font-medium text-sm">
            {comment.usuario}
          </p>
          {comment.is_edited && (
            <span className="text-xs text-gray-400 italic">(editado)</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <small className="text-gray-400 text-xs">
            {new Date(comment.created_at).toLocaleString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </small>
          {isOwner && (
        <div className="flex space-x-2 ml-2">
          {!isEditing && (
            <>
              <button
                onClick={handleEdit}
                className="text-green-500 hover:text-green-600 text-sm p-1"
                title="Editar comentario"
              >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600 text-sm p-1"
                title="Eliminar comentario"
              >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 pl-10">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              rows="3"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
