import axios from 'axios'

const host = `${import.meta.env.VITE_API_URL}/api`;

const API = axios.create({ baseURL: host});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;