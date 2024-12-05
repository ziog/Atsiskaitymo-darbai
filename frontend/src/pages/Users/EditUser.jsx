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
        setError("Nepavyko gauti vartotojo duomenų.");
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
      alert("Amžius turi būti teigiamas skaičius.");
      return;
    }

    try {
      await updateUserById(id, { ...user, age: parseInt(user.age, 10) });
      alert("Vartotojas sėkmingai atnaujintas!");
      navigate(`/users/${id}`);
    } catch {
      alert("Nepavyko atnaujinti vartotojo. Prašome pabandyti dar kartą.");
    }
  };

  if (loading) {
    return <p>Kraunami vartotojo duomenys...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Redaguoti vartotoją</h2>
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
          Išsaugoti pakeitimus
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ color: "red" }}
        >
          Atšaukti
        </button>
      </form>
    </div>
  );
};

export default EditUser;
