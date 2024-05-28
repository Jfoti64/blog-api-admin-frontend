// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreatePost = () => {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      console.error('User not logged in');
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/posts`,
        { title, post_text: postText, user: auth.user._id }, // Include user ID in the request
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      navigate('/posts'); // Redirect to the posts page after successful post creation
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Post Text:</label>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
