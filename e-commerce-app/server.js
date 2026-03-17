import dotenv from "dotenv";
dotenv.config();
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

const app = express();
const PORT = process.env.PORT || 5000;

/* Render proxy fix */
app.set("trust proxy", 1);

/* Security */
app.use(helmet());

/* Rate Limit */
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

/* Middleware */
app.use(express.json());
app.use(passport.initialize());

/* Database */
connectDB();

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/employees", adminEmployeeRoutes);

/* Root */
app.get("/", (req, res) => {
  res.send("E-commerce Backend API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
