import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Import Pages
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductListPage from "./components/ProductListPage";
import ProductDetailPage from "./components/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage"; // Import Order History Page

// Import Auth Selector
import { selectIsAuthenticated } from "./store/authSlice";

// Simple Protected Route Component
function ProtectedRoute({ element }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Protected Route for Order History */}
          <Route
            path="/order-history"
            element={<ProtectedRoute element={<OrderHistoryPage />} />}
          />
          {/* Add more routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
