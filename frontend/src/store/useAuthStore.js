import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true; // to send cookies to the server

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isVerified: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signUp: async ({ email, password, username, profilePicture }) => {
    set({ isLoading: true, error: null });

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("profilePic", profilePicture); // the File object

      const response = await axios.post(`${API_URL}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({
        user: response.data.user,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  },

  // login function
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.error || "Error Logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // check auth fucntion for checking the authentication status

}));

export default useAuthStore;
