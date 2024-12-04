
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPostById } from "../../api/postsApi";

const PostDetails = () => {
  const params = useParams();
  const id = params.id
  const postId = params.postId
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
        setError("Failed to fetch the post.");
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div>
      <h2>Post Details</h2>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <hr />
      <Link to={`/users/${id}/posts/${postId}/edit`} style={{ color: "blue", marginRight: "10px" }}>
        Edit Post
      </Link>
      <Link to={`/users/${id}/posts/${postId}/delete`} style={{ color: "red" }}>
        Delete Post
      </Link>
      <button onClick={() => navigate(-1)} style={{ marginTop: "10px" }}>
        Back
      </button>
    </div>
  );
};

export default PostDetails;
