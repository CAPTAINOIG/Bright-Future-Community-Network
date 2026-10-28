import axios from "axios";
import useAuthStore from "../store/useAuthStore";

// Ensure baseURL ends with /api and has no trailing slash
const getBaseURL = () => {
  let url = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  // Remove trailing slash if present
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  // Ensure it ends with /api
  if (!url.endsWith("/api")) {
    url = url.replace(/\/api\/?$/, "") + "/api";
  }
  return url;
};

const baseURL = getBaseURL();

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || 50000),
});

// Request interceptor to inject token dynamically
axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore.getState();
  const token = authStore.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  
  return config;
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && 
        error.response?.data?.message !== "secretOrPrivateKey must have a value") {
      const authStore = useAuthStore.getState();
      authStore.logout();
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
