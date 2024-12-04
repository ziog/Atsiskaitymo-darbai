import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../api/usersApi";

const NewUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (isNaN(user.age) || user.age <= 0) {
      setError("Age must be a positive number.");
      return;
    }

    try {
      await createNewUser({ ...user, age: parseInt(user.age, 10) });
      alert("User created successfully!");
      navigate("/users");
    } catch {
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
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
          Create User
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ color: "red" }}
        >
          Cancel
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default NewUser;
