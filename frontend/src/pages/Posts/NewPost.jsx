
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
      alert("Post created successfully!");
      navigate(`/users/${post.userId}/posts`); 
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("An error occurred while creating the post.");
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
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
          <label htmlFor="body">Body</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Post</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewPost;
