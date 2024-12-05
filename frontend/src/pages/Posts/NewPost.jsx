import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPost } from "../../api/postsApi";

const NewPost = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  post.userId = searchParams.get("userId");

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
      await createPost(post);
      alert("Įrašas sėkmingai sukurtas!");
      navigate(`/users/${post.userId}/posts`); 
    } catch (error) {
      console.error("Nepavyko sukurti įrašo:", error);
      alert("Įvyko klaida kuriant įrašą.");
    }
  };

  return (
    <div>
      <h2>Sukurti naują įrašą</h2>
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
          <label htmlFor="body">Turinys</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sukurti įrašą</button>
        <button type="button" onClick={() => navigate(-1)}>
          Atšaukti
        </button>
      </form>
    </div>
  );
};

export default NewPost;
