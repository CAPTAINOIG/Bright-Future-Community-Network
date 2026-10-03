import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//  Request interceptor to inject token dynamically
// axiosInstance.interceptors.request.use((config) => {
//   const authStore = useAuthStore.getState();
//   const token = authStore.getToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   if (config.data instanceof FormData) {
//     config.headers["Content-Type"] = "multipart/form-data";
//   } else {
//     config.headers["Content-Type"] = "application/json";
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 && 
//         error.response?.data?.message !== "secretOrPrivateKey must have a value") {
//       const authStore = useAuthStore.getState();
//       authStore.logout();
//       if (window.location.pathname !== '/login') {
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
