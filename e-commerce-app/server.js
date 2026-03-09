require("dotenv").config();
const express = require("express");
const connectDB = require("../e-commerce-app/src/config/db");
const authRoutes = require("../e-commerce-app/src/routes/authRoutes");
const productRoutes = require("../e-commerce-app/src/routes/productRoutes");
const cartRoutes = require("../e-commerce-app/src/routes/cartRoutes");
const app = express();

const PORT = process.env.PORT || 5000;

// middleware
connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// test route
app.get("/", (req, res) => {
  res.send("E-commerce Backend API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
