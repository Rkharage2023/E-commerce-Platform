import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 dark:text-white">
          Create Your Account
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>
        {/* Fixed: was hardcoded production URL, now uses API_URL */}
        href={`${API_URL}/api/auth/google`}
        className="flex items-center justify-center gap-3 w-full border
        border-gray-300 bg-white text-gray-700 py-2.5 rounded-lg shadow-sm
        hover:bg-gray-100 transition"
        <a>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Continue with Google</span>
        </a>
        <p className="text-center mt-5 text-sm dark:text-gray-300">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-medium ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
