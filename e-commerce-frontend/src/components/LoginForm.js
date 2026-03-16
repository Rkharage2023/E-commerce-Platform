import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "../store/authSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://e-commerce-platform-yogr.onrender.com/api/auth/login",
        {
          email,
          password,
        },
      );

      const { token, user } = response.data;

      localStorage.setItem("jwtToken", token);
      dispatch(setCredentials({ token, user }));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-sm w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
