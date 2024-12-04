import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPosts } from '../../api/postsApi';

const PostList = () => {
  const params = useParams(); // User ID
  const id = params.id
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts(id)
      .then((data) => {
        const userPosts = data.filter((post) => post.userId._id === id);
        setPosts(userPosts);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch posts.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Posts for User {id}</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <Link to={`${post._id}`} style={{ marginRight: '10px' }}>
                View Details
              </Link>
              <Link to={`${post._id}/edit`} style={{ marginRight: '10px', color: 'orange' }}>
                Edit
              </Link>
              <Link to={`${post._id}/delete`} style={{ color: 'red' }}>
                Delete
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found for this user. {id}</p>
      )}
    </div>
  );
};

export default PostList;
