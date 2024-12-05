import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPosts } from '../../api/postsApi';

const PostList = () => {
  const params = useParams(); // Vartotojo ID
  const id = params.id;
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
        setError('Nepavyko gauti įrašų.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Įrašai įkeliami...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Įrašai vartotojui {id}</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <Link to={`${post._id}`} style={{ marginRight: '10px' }}>
                Peržiūrėti detales
              </Link>
              <Link to={`${post._id}/edit`} style={{ marginRight: '10px', color: 'orange' }}>
                Redaguoti
              </Link>
              <Link to={`${post._id}/delete`} style={{ color: 'red' }}>
                Ištrinti
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Šiam vartotojui nerasta įrašų. {id}</p>
      )}
    </div>
  );
};

export default PostList;
