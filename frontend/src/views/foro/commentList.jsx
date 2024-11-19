// CommentList.jsx
import { useState } from 'react';
import CommentItem from './commentItem';

const CommentList = ({ comments, currentUserId, onDelete, onUpdate }) => {
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentItem
          key={comment.comment_id}
          comment={comment}
          currentUserId={currentUserId}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default CommentList;
