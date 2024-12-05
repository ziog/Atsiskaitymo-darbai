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
      setError("Amžius turi būti teigiamas skaičius.");
      return;
    }

    try {
      await createNewUser({ ...user, age: parseInt(user.age, 10) });
      alert("Vartotojas sėkmingai sukurtas!");
      navigate("/users");
    } catch {
      setError("Nepavyko sukurti vartotojo. Prašome pabandyti dar kartą.");
    }
  };

  return (
    <div>
      <h2>Sukurti naują vartotoją</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vardas:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>El. paštas:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amžius:</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginRight: "10px", color: "green" }}>
          Sukurti vartotoją
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ color: "red" }}
        >
          Atšaukti
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default NewUser;
