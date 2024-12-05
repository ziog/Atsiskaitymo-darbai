import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPostById } from "../../api/postsApi";

const PostDetails = () => {
  const params = useParams();
  const id = params.id;
  const postId = params.postId;
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostById(postId)
      .then((fetchedPost) => {
        setPost(fetchedPost);
        setLoading(false);
      })
      .catch((err) => {
        setError("Nepavyko gauti įrašo.");
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <p>Įkeliama...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Įrašas nerastas.</p>;
  }

  return (
    <div>
      <h2>Įrašo detalės</h2>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <hr />
      <Link to={`/users/${id}/posts/${postId}/edit`} style={{ color: "blue", marginRight: "10px" }}>
        Redaguoti įrašą
      </Link>
      <Link to={`/users/${id}/posts/${postId}/delete`} style={{ color: "red" }}>
        Ištrinti įrašą
      </Link>
      <button onClick={() => navigate(-1)} style={{ marginTop: "10px" }}>
        Atgal
      </button>
    </div>
  );
};

export default PostDetails;
