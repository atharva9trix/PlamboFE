import axios from "axios";

const instance = axios.create({
  // baseURL: "http://34.135.58.98:5005/api/",
  baseURL: "https://pbp.morningwalkusa.com/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
