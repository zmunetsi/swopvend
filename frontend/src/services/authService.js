// src/services/authService.js
import api from "@/utils/api";

export const signup = async (payload) => {
  const response = await api.post("/auth/signup/", payload);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/auth/token/", credentials, {
    withCredentials: true,
  });
  return response.data;
};

// Improved logout: always call backend logout endpoint, clear tokens, and ignore localStorage
export const logout = async () => {
  try {
    await api.post("/auth/logout/", {}, { withCredentials: true });
  } catch (error) {
    console.warn("Logout error:", error.response?.data || error.message);
  }
};

// Improved fetchCurrentUser: always send credentials (cookie)
export const fetchCurrentUser = async () => {
  const response = await api.get("/traders/me/", { withCredentials: true });
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/traders/me/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/password/reset/", { email });
  return response.data;
};

export const resetPassword = async ({ uid, token, new_password1, new_password2 }) => {
  const response = await api.post("/auth/password/reset/confirm/", {
    uid,
    token,
    new_password1,
    new_password2,
  });
  return response.data;
};