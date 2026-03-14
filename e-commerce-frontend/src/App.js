import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import ForceReload from "./components/ForceReload";

// Components
import Navbar from "./components/Navbar";
import EmployeeRoute from "./components/EmployeeRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
import HomePage from "./pages/HomePage";
import ProductListPage from "./components/ProductListPage";
import ProductDetailPage from "./components/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import MyProducts from "./pages/MyProducts";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminEmployees from "./pages/AdminEmployees";

// Employee
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Other
import GoogleSuccess from "./pages/GoogleSuccess";
import SetPasswordPage from "./pages/SetPasswordPage";

// Auth selector
import { selectIsAuthenticated } from "./store/authSlice";

// ============================
// Protected Route
// ============================

function ProtectedRoute({ element }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function ReloadOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

// ============================
// App Component
// ============================

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Navbar />
      <ForceReload />
      <ReloadOnRouteChange />
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/set-password/:token" element={<SetPasswordPage />} />

        {/* CART + CHECKOUT */}

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* USER ROUTES */}

        <Route
          path="/orders"
          element={<ProtectedRoute element={<OrderHistoryPage />} />}
        />

        <Route
          path="/my-products"
          element={<ProtectedRoute element={<MyProducts />} />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <AdminRoute>
              <AdminEmployees />
            </AdminRoute>
          }
        />

        {/* EMPLOYEE ROUTES */}

        <Route
          path="/employee"
          element={
            <EmployeeRoute>
              <EmployeeDashboard />
            </EmployeeRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
