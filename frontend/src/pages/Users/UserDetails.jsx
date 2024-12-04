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
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>
        <strong>ID:</strong> {user._id}
      </p>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button
        onClick={() => navigate(`/users/${user._id}/edit`)}
        style={{ marginRight: "10px", color: "orange" }}
      >
        Edit User
      </button>
      <button
        onClick={() => navigate(`/users/${user._id}/delete`)}
        style={{ color: "red" }}
      >
        Delete User
      </button>
      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: "10px", color: "blue" }}
      >
        Go Back
      </button>

      <hr />
      <div>
        <h3>Manage Posts for {user.name}</h3>
        <ul>
          <li key="viewallposts">
            <Link to={`posts`} style={{ marginRight: "10px" }}>
              View All Posts
            </Link>
          </li>
          <li key="newpost">
            <Link to={`posts/new?userId=${user._id}`} style={{ color: "green" }}>
              Add New Post
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default UserDetails;
