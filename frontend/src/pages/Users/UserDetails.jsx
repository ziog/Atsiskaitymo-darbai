import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { fetchUserById } from "../../api/usersApi";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
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

  if (loading) {
    return <p>Kraunami vartotojo duomenys...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Vartotojas nerastas.</p>;
  }

  return (
    <div>
      <h2>Vartotojo duomenys</h2>
      <p>
        <strong>ID:</strong> {user._id}
      </p>
      <p>
        <strong>Vardas:</strong> {user.name}
      </p>
      <p>
        <strong>El. paštas:</strong> {user.email}
      </p>
      <button
        onClick={() => navigate(`/users/${user._id}/edit`)}
        style={{ marginRight: "10px", color: "orange" }}
      >
        Redaguoti vartotoją
      </button>
      <button
        onClick={() => navigate(`/users/${user._id}/delete`)}
        style={{ color: "red" }}
      >
        Ištrinti vartotoją
      </button>
      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: "10px", color: "blue" }}
      >
        Grįžti atgal
      </button>

      <hr />
      <div>
        <h3>Tvarkyti {user.name} įrašus</h3>
        <ul>
          <li key="viewallposts">
            <Link to={`posts`} style={{ marginRight: "10px" }}>
              Peržiūrėti visus įrašus
            </Link>
          </li>
          <li key="newpost">
            <Link to={`posts/new?userId=${user._id}`} style={{ color: "green" }}>
              Pridėti naują įrašą
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default UserDetails;
