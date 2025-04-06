import { create } from "zustand";
import axios from "axios";
import { deleteBlog, updateBlog } from "../../../backend/src/controllers/blog.controller";

const API_URL = "http://localhost:5000/api";

axios.defaults.withCredentials = true;

export const useBlogStore = create((set) => ({
  blogs: [],
  blog: null,
  error: null,
  isLoading: false,

  fetchBlogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/blog`);
      set({ blogs: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchBlogById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/blog/${id}`);
      set({ blog: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createBlog: async ({ title, description, blogImage }) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("blogImage", blogImage);

      const response = await axios.post(`${API_URL}/blog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        blogs: [...state.blogs, response.data],
        blog: response.data,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  updateBlog: async (id, { title, description, blogImage }) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (blogImage) {
        formData.append("blogImage", blogImage);
      }

      const response = await axios.put(`${API_URL}/blog/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog._id === id ? { ...blog, ...response.data } : blog
        ),
        blog: response.data,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteBlog: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/blog/${id}`);
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  }
}));
