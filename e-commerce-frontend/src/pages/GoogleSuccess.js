import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../store/authSlice";
import { API_URL } from "../utils/api";

function GoogleSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Fixed: fetch user profile so we can store user object in Redux + localStorage
      axios
        .get(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(
            setCredentials({
              token,
              user: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
              },
            }),
          );

          if (res.data.role === "admin") {
            navigate("/admin");
          } else if (res.data.role === "employee") {
            navigate("/employee");
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow text-center max-w-md w-full">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Logging you in...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Please wait while we complete your Google authentication.
        </p>
      </div>
    </div>
  );
}

export default GoogleSuccess;
