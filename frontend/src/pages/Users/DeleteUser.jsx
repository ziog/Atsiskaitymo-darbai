
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserById } from "../../api/usersApi";

const DeleteUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUserById(id);
      alert("User deleted successfully!");
      navigate("/users");
    } catch (error) {
      alert("Failed to delete the user. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>Delete User</h2>
      <p>Are you sure you want to delete this user?</p>
      <button onClick={handleDelete} style={{ marginRight: "10px", color: "red" }}>
        Yes, Delete
      </button>
      <button onClick={handleCancel} style={{ color: "blue" }}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteUser;
