// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CommentEditForm = ({ comment, setEditing, setComment, postId }) => {
  const [commentText, setCommentText] = useState(comment.comment_text);

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/posts/${postId}/comments/${comment._id}`, {
        comment_text: commentText,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setComment(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </div>
  );
};

CommentEditForm.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comment_text: PropTypes.string.isRequired,
  }).isRequired,
  setEditing: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default CommentEditForm;
