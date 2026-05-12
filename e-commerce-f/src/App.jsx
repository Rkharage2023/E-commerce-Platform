import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import Navbar from "./components/Navbar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Footer from "./components/Footer.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import EmployeeRoute from "./components/EmployeeRoute.jsx";

// Public Pages
import HomePage from "./pages/HomePage.jsx";
import ProductListPage from "./components/ProductListPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import GoogleSuccess from "./pages/GoogleSuccess.jsx";
import SetPasswordPage from "./pages/SetPasswordPage.jsx";

// Protected Pages
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminEmployees from "./pages/AdminEmployees.jsx";

// Employee Pages
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";

import { selectIsAuthenticated } from "./store/authSlice.js";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22 } },
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes({ openCart }) {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ flex: 1 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage openCart={openCart} />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route
            path="/products/:id"
            element={<ProductDetail onAdded={openCart} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path="/set-password/:token" element={<SetPasswordPage />} />
          <Route
            path="/checkout"
            element={
              isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/payment"
            element={
              isAuthenticated ? <PaymentPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated ? <OrderHistoryPage /> : <Navigate to="/login" />
            }
          />
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
          <Route
            path="/employee"
            element={
              <EmployeeRoute>
                <EmployeeDashboard />
              </EmployeeRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <ScrollToTop />
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <AnimatedRoutes openCart={() => setIsCartOpen(true)} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
