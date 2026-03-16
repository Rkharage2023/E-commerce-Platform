import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwtToken", token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
