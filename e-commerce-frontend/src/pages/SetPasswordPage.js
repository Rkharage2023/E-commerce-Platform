import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function SetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:5000/api/auth/set-password/${token}`, {
      password,
    });

    alert("Password set successfully");

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={submit} className="bg-white p-8 shadow rounded">
        <h2 className="text-xl mb-4">Create Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Set Password
        </button>
      </form>
    </div>
  );
}

export default SetPasswordPage;
