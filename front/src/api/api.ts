import axios from "axios";
import { useAuthStore } from "../store/auth";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

// Interceptor para incluir token automaticamente nas requisições
api.interceptors.request.use((config) => {
  const auth = useAuthStore.getState();
  const token = auth?.user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
