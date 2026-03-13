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
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminLayout from "./admin/AdminLayout";
import AdminProducts from "./pages/AdminProducts";
import AdminEmployees from "./pages/AdminEmployees";
import GoogleSuccess from "./pages/GoogleSuccess";
import SetPasswordPage from "./pages/SetPasswordPage";
import PaymentPage from "./pages/PaymentPage";
import MyProducts from "./pages/MyProducts";

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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin" element={<AdminLayout />}></Route>
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path="/set-password/:token" element={<SetPasswordPage />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route path="/my-products" element={<MyProducts />} />
          {/* Protected Route for Order History */}
          <Route
            path="/orders"
            element={<ProtectedRoute element={<OrderHistoryPage />} />}
          />
          {/* Add more routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
