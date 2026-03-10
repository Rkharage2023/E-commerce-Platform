import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend API base URL
});

// Request interceptor to add the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor (optional, for handling token expiry, etc.)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration or unauthorized errors
    if (error.response && error.response.status === 401) {
      // Dispatch logout action, redirect to login page, etc.
      console.error("Unauthorized access - Token might be expired.");
      // Example: store.dispatch(logout());
      // Example: window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
