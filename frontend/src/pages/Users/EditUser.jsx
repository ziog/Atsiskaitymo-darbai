import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUserById } from "../../api/usersApi";

const EditUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", age: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (isNaN(user.age) || user.age <= 0) {
      alert("Age must be a positive number.");
      return;
    }

    try {
      await updateUserById(id, { ...user, age: parseInt(user.age, 10) }); 
      alert("User updated successfully!");
      navigate(`/users/${id}`); 
    } catch {
      alert("Failed to update user. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginRight: "10px", color: "green" }}>
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ color: "red" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUser;
