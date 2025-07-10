// src/services/itemService.js
import api from "@/utils/api";

export const uploadItem = async (formData) => {
  try {
    const response = await api.post("/items/", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchItems = async () => {
  try {
    const response = await api.get("/items/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserItems = async () => {
  try {
    const response = await api.get("/items/user/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchItemDetail = async (id) => {
  try {
    const response = await api.get(`/items/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (id, data) => {
  try {
    const response = await api.put(`/items/${id}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserItems = async () => {
  const response = await api.get('/items/user/');
  return response.data;
};

// services/itemService.js

export const fetchAllItems = async () => {
  const response = await api.get("/public-items/");
  return response.data;
};

export const fetchItemById = async (id) => {
  const response = await api.get(`/public-items/${id}/`);
  return response.data;
};

export const renewItem = async (id) => {
  try {
    const response = await api.post(`/items/${id}/renew/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const giveAwayItem = async (id) => {
  try {
    const response = await api.post(`/items/${id}/give_away/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

