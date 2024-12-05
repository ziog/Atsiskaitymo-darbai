import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, updatePost } from "../../api/postsApi";

const EditPost = () => {
  const params = useParams();
  const postId = params.postId;
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(postId, post);
      alert("Įrašas sėkmingai atnaujintas!");
      navigate(`/users/${params.id}/posts/${postId}`);
    } catch (error) {
      console.error("Nepavyko atnaujinti įrašo:", error);
      alert("Įvyko klaida bandant atnaujinti įrašą.");
    }
  };

  if (loading) {
    return <p>Kraunama...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Redaguoti įrašą</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Pavadinimas</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Turinys</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Atnaujinti įrašą</button>
        <button type="button" onClick={() => navigate(-1)}>
          Atšaukti
        </button>
      </form>
    </div>
  );
};

export default EditPost;
