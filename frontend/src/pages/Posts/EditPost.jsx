
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, updatePost } from "../../api/postsApi";

const EditPost = () => {
  const params = useParams();
  const postId = params.postId
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
        setError("Failed to fetch the post.");
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
      alert("Post updated successfully!");
      navigate(`/users/${params.id}/posts/${postId}`); 
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("An error occurred while updating the post.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
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
          <label htmlFor="content">Body</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Post</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPost;
