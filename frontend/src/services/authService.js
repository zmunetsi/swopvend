// src/services/authService.js
import api from "@/utils/api";
import { setTokens, clearTokens } from "@/utils/auth";

export const signup = async (payload) => {
  const response = await api.post("/auth/signup/", payload);
  // Automatically log in after successful signup
  setTokens(response.data);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/auth/token/", credentials);
  setTokens(response.data);
  return response.data;
};

export const logout = async () => {
  const refresh = localStorage.getItem("refresh_token");
  try {
    await api.post("/auth/logout/", { refresh });
  } catch (error) {
    console.warn("Logout error:", error.response?.data || error.message);
  }
  clearTokens();
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/traders/me/");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/traders/me/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    
  });
  return response.data;
}