import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../../api/usersApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Nepavyko gauti vartotojų.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Kraunami vartotojai...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2>Vartotojų sąrašas</h2>
      <Link to="/users/new" style={{ color: "green", marginBottom: "10px" }}>
        Pridėti naują vartotoją
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>
                <strong>Vardas:</strong> {user.name} <br />
                <strong>El. paštas:</strong> {user.email}
              </p>
              <Link to={`/users/${user._id}`} style={{ marginRight: "10px" }}>
                Peržiūrėti detales
              </Link>
              <Link
                to={`/users/${user._id}/edit`}
                style={{ marginRight: "10px", color: "orange" }}
              >
                Redaguoti
              </Link>
              <Link to={`/users/${user._id}/delete`} style={{ color: "red" }}>
                Ištrinti
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Vartotojai nerasti.</p>
      )}
    </div>
  );
};

export default UserList;
