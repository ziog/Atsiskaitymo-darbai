const API_URL_POSTS = import.meta.env.VITE_API_URL + "/posts";

// Gauti įrašus specifiniam vartotojui
export const fetchPosts = async (userId) => {
  const response = await fetch(`${API_URL_POSTS}?userId=${userId}`);
  return response.json();
};

// Gauti specifinį įrašą pagal ID
export const fetchPostById = async (id) => {
  const response = await fetch(`${API_URL_POSTS}/${id}`);
  return response.json();
};

// Sukurti naują įrašą (įsitikinkite, kad `post` turi `userId`)
export const createPost = async (post) => {
  const response = await fetch(API_URL_POSTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return response.json();
};

// Atnaujinti esamą įrašą
export const updatePost = async (id, post) => {
  const response = await fetch(`${API_URL_POSTS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return response.json();
};

// Ištrinti įrašą pagal ID
export const deletePost = async (id) => {
  const response = await fetch(`${API_URL_POSTS}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
