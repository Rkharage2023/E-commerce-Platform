import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { API_URL } from "../utils/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      dispatch(
        setCredentials({
          token: response.data.token,
          user: {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          },
        }),
      );

      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        }),
      );

      if (response.data.role === "employee") {
        navigate("/employee");
      } else if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 dark:text-white">
          Login to EduStore
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-gray-200">
              Email
            </label>

            <input
              type="email"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Login */}

        <a
          href={`${API_URL}/api/auth/google`}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 bg-white text-gray-700 py-2.5 rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />

          <span className="font-medium">Continue with Google</span>
        </a>

        {/* Register Link */}

        <p className="text-center mt-5 text-sm dark:text-gray-300">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-600 font-medium ml-1 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
