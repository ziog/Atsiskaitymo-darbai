
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletePost } from "../../api/postsApi";

const DeletePost = () => {
  const { id, postId } = useParams(); 
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (confirm) {
      try {
        await deletePost(postId);
        alert("Post deleted successfully!");
        navigate(`/users/${id}/posts`);
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert("An error occurred while deleting the post.");
      }
    }
  };

  return (
    <div>
      <h2>Delete Post</h2>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={handleDelete} style={{ color: "white", background: "red", padding: "10px" }}>
        Delete
      </button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
};

export default DeletePost;
