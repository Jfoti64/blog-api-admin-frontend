// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const PostEditForm = ({ post, setEditing, setPost }) => {
  const [title, setTitle] = useState(post.title);
  const [postText, setPostText] = useState(post.post_text);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${post._id}`,
        {
          title,
          post_text: postText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Ensure comments array is preserved
      const updatedPost = {
        ...response.data,
        comments: post.comments, // Preserve the existing comments array
      };

      setPost(updatedPost);
      setEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={postText} onChange={(e) => setPostText(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </div>
  );
};

PostEditForm.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    post_text: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
  }).isRequired,
  setEditing: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
};

export default PostEditForm;
