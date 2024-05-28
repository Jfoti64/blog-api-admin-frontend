import { useState } from 'react';
import PropTypes from 'prop-types';
import CommentEditForm from './CommentEditForm';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comment = ({ comment, postId, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment);

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      onDelete(commentId); // Call the onDelete function to update the parent's state
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      {editing ? (
        <CommentEditForm comment={currentComment} postId={postId} setEditing={setEditing} setComment={setCurrentComment} />
      ) : (
        <div>
          <p>{currentComment.comment_text}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => handleCommentDelete(comment._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comment_text: PropTypes.string.isRequired,
  }).isRequired,
  postId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;
