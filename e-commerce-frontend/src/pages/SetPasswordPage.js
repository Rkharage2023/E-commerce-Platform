import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/api";

function SetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(`${API_URL}/api/auth/set-password/${token}`, {
      password,
    });

    alert("Password set successfully");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={submit}
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Create Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="
          border
          border-gray-300
          p-2.5
          rounded-lg
          w-full
          mb-4
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          dark:bg-gray-700
          dark:border-gray-600
          dark:text-white
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-2.5
          rounded-lg
          transition
          "
        >
          Set Password
        </button>
      </form>
    </div>
  );
}

export default SetPasswordPage;
