import axios from "axios";
import { authToken } from "./auth-token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitudes
api.interceptors.request.use(
  (config) => {
    const token = authToken.get();

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authToken.clear();
    }

    return Promise.reject(error);
  },
);
