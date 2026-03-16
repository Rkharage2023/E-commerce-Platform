require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const favicon = require("serve-favicon");
const path = require("path");

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const adminEmployeeRoutes = require("./src/routes/adminEmployeeRoutes");

require("./src/config/passport");

const app = express();

const PORT = process.env.PORT || 5000;

/* SECURITY */
app.use(helmet());

/* RATE LIMIT */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

/* CORS */
const allowedOrigins = [
  "https://eproductsplatform.netlify.app/",
  "http://localhost:3000",
];

/* MIDDLEWARE */
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://eproductsplatform.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

/* DATABASE */
connectDB();

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/employees", adminEmployeeRoutes);

/* ROOT TEST */
app.get("/", (req, res) => {
  res.send("E-commerce Backend API Running ");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
