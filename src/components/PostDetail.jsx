// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import PostEditForm from './PostEditForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDeleteComment = (commentId) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments.filter((comment) => comment._id !== commentId),
    }));
  };

  const handleChangePublish = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/posts/${post._id}`,
        { published: !post.published },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Fetch the full post data again after updating the publish status
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPost(response.data);
    } catch (error) {
      console.error('Error changing publish status:', error);
    }
  };

  const handlePostDelete = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/posts/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Navigate back to the posts list or another route after deleting
      navigate('/posts');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {editing ? (
        <PostEditForm post={post} setEditing={setEditing} setPost={setPost} />
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.post_text}</p>
          <button onClick={() => setEditing(true)}>Edit Post</button>
          <button onClick={handlePostDelete}>Delete Post</button>
        </div>
      )}
      <h2>Comments</h2>
      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} postId={post._id} onDelete={handleDeleteComment} />
        ))
      ) : (
        <p>No comments available.</p>
      )}
      {post.published ? (
        <button onClick={handleChangePublish}>Unpublish</button>
      ) : (
        <button onClick={handleChangePublish}>Publish</button>
      )}
    </div>
  );
};

export default PostDetail;
