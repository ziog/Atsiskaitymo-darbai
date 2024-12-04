const API_URL_POSTS = import.meta.env.VITE_API_URL + "/posts";

// Fetch posts for a specific user
export const fetchPosts = async (userId) => {
  const response = await fetch(`${API_URL_POSTS}?userId=${userId}`);
  return response.json();
};

// Fetch a specific post by ID
export const fetchPostById = async (id) => {
  const response = await fetch(`${API_URL_POSTS}/${id}`);
  return response.json();
};

// Create a new post (ensure `post` includes `userId`)
export const createPost = async (post) => {
  const response = await fetch(API_URL_POSTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return response.json();
};

// Update an existing post
export const updatePost = async (id, post) => {
  const response = await fetch(`${API_URL_POSTS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return response.json();
};

// Delete a post by ID
export const deletePost = async (id) => {
  const response = await fetch(`${API_URL_POSTS}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
