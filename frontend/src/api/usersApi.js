const API_URL_USERS = import.meta.env.VITE_API_URL + "/users";

export const fetchAllUsers = async () => {
  const response = await fetch(API_URL_USERS);
  return response.json();
};

export const fetchUserById = async (id) => {
  const response = await fetch(`${API_URL_USERS}/${id}`);
  return response.json();
};

export const createNewUser = async (user) => {
  const response = await fetch(API_URL_USERS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUserById = async (id, user) => {
  const response = await fetch(`${API_URL_USERS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUserById = async (id) => {
  const response = await fetch(`${API_URL_USERS}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
