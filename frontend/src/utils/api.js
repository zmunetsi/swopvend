import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Always send cookies
});

// No request interceptor needed for Authorization header

// No response interceptor for token refresh

export default api;
