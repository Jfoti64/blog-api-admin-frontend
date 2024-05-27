import { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {error && <p>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <a href={`/posts/${post._id}`}>
              {post.title}: {post.published ? <span>published</span> : <span>un-published</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
