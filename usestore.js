import { create } from "zustand";
import { fetchUsers, fetchUserPosts, fetchPostComments } from "../api/apiService";

const useStore = create((set) => ({
  users: [],
  posts: [],
  comments: {},
  
  loadUsers: async () => {
    const users = await fetchUsers();
    set({ users });
  },

  loadUserPosts: async (userId) => {
    const posts = await fetchUserPosts(userId);
    set((state) => ({ posts: [...state.posts, ...posts] }));
  },

  loadPostComments: async (postId) => {
    const comments = await fetchPostComments(postId);
    set((state) => ({ comments: { ...state.comments, [postId]: comments } }));
  },
}));

export default useStore;
