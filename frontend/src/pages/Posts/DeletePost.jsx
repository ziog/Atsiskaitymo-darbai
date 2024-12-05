import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletePost } from "../../api/postsApi";

const DeletePost = () => {
  const { id, postId } = useParams(); 
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Ar tikrai norite ištrinti šį įrašą?"); // Patvirtinimo langas
    if (confirm) {
      try {
        await deletePost(postId);
        alert("Įrašas sėkmingai ištrintas!"); // Pranešimas apie sėkmingą ištrynimą
        navigate(`/users/${id}/posts`);
      } catch (error) {
        console.error("Nepavyko ištrinti įrašo:", error);
        alert("Įvyko klaida bandant ištrinti įrašą."); // Klaidos pranešimas
      }
    }
  };

  return (
    <div>
      <h2>Trinti įrašą</h2>
      <p>Ar tikrai norite ištrinti šį įrašą?</p>
      <button onClick={handleDelete} style={{ color: "white", background: "red", padding: "10px" }}>
        Ištrinti
      </button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
        Atšaukti
      </button>
    </div>
  );
};

export default DeletePost;
