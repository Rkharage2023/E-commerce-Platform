require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require("../e-commerce-app/src/config/db");
const authRoutes = require("../e-commerce-app/src/routes/authRoutes");
const productRoutes = require("../e-commerce-app/src/routes/productRoutes");
const cartRoutes = require("../e-commerce-app/src/routes/cartRoutes");
const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://your-frontend-domain.vercel.app', // Replace with your Vercel URL
  'https://your-frontend-domain.netlify.app', // If using Netlify
  'http://localhost:5173', // For local development with Vite
  'http://localhost:3000', // For local development with CRA
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you are using cookies or sessions
}));


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

const errorHandler = (err, req, res, next) => {
  // Log the error for server-side debugging
  console.error("${err.name}: ${err.message} - ${req.originalUrl}"); 
  // Determine status code and message
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message; 
  // Handle specific Mongoose errors
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Resource not found (Invalid ID)";
  }
  if (err.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = "Duplicate field value entered for ${field}";
  }
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  } 
  // Send response
  res.status(statusCode).json({
    message: message, 
    // Optionally include stack trace in development environment
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};
app.use(errorHandler); 
// Start the server
app.listen(PORT, () => {
  console.log(
    "Server is running on port ${PORT} in ${process.env.NODE_ENV} mode",
  );
});
