import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-platform-yogr.onrender.com/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - token may be expired.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
