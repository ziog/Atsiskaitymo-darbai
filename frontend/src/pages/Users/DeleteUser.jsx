import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserById } from "../../api/usersApi";

const DeleteUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUserById(id);
      alert("Vartotojas sėkmingai ištrintas!");
      navigate("/users");
    } catch (error) {
      alert("Nepavyko ištrinti vartotojo. Prašome pabandyti dar kartą.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>Ištrinti vartotoją</h2>
      <p>Ar tikrai norite ištrinti šį vartotoją?</p>
      <button onClick={handleDelete} style={{ marginRight: "10px", color: "red" }}>
        Taip, ištrinti
      </button>
      <button onClick={handleCancel} style={{ color: "blue" }}>
        Atšaukti
      </button>
    </div>
  );
};

export default DeleteUser;
