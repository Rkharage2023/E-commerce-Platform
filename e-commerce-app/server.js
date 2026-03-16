import dotenv from "dotenv";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import passport from "passport";

import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import adminEmployeeRoutes from "./src/routes/adminEmployeeRoutes.js";

import "./src/config/passport.js";
dotenv.config();

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
app.use(
  cors({
    origin: ["http://localhost:3000", "https://eproductsplatform.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

/* MIDDLEWARE */
app.use(express.json());
app.use(passport.initialize());

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
  res.send("E-commerce Backend API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
