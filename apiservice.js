import axios from "axios";

const API_BASE_URL = "http://20.244.56.144/evaluation-service";

// Fetch users
export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data.users;
};

// Fetch posts for a user
export const fetchUserPosts = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`);
  return response.data.posts;
};

// Fetch comments for a post
export const fetchPostComments = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
  return response.data.comments;
};
