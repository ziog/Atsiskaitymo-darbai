const API_URL_USERS = import.meta.env.VITE_API_URL + "/users";

export const fetchAllUsers = async () => {
  const response = await fetch(API_URL_USERS); // Gauti visus vartotojus
  return response.json();
};

export const fetchUserById = async (id) => {
  const response = await fetch(`${API_URL_USERS}/${id}`); // Gauti vartotoją pagal ID
  return response.json();
};

export const createNewUser = async (user) => {
  const response = await fetch(API_URL_USERS, {
    method: "POST", // Sukurti naują vartotoją
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUserById = async (id, user) => {
  const response = await fetch(`${API_URL_USERS}/${id}`, {
    method: "PUT", // Atnaujinti vartotoją pagal ID
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUserById = async (id) => {
  const response = await fetch(`${API_URL_USERS}/${id}`, {
    method: "DELETE", // Ištrinti vartotoją pagal ID
  });
  return response.json();
};
