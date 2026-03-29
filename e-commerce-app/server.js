import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import { createRequire } from "module";

// Only load .env file in local development
// In production (Render), env vars are set via the dashboard
if (process.env.NODE_ENV !== "production") {
  const { default: dotenv } = await import("dotenv");
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.join(__dirname, ".env") });
}

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

app.set("trust proxy", 1);
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(passport.initialize());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/employees", adminEmployeeRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce Backend API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Temporary debug route — shows which database is connected
app.get("/debug", (req, res) => {
  res.json({
    dbName: mongoose.connection.name,
    dbHost: mongoose.connection.host,
    mongoUri: process.env.MONGO_URI
      ? process.env.MONGO_URI.substring(0, 50) + "..."
      : "NOT SET",
    nodeEnv: process.env.NODE_ENV,
  });
});
