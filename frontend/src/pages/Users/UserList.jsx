
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
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2>User List</h2>
      <Link to="/users/new" style={{ color: "green", marginBottom: "10px" }}>
        Add New User
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>
                <strong>Name:</strong> {user.name} <br />
                <strong>Email:</strong> {user.email}
              </p>
              <Link to={`/users/${user._id}`} style={{ marginRight: "10px" }}>
                View Details
              </Link>
              <Link
                to={`/users/${user._id}/edit`}
                style={{ marginRight: "10px", color: "orange" }}
              >
                Edit
              </Link>
              <Link to={`/users/${user._id}/delete`} style={{ color: "red" }}>
                Delete
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
