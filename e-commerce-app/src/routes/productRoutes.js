const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware"); // We'll create this middleware next
const admin = require("../middleware/adminMiddleware");

// --- @desc   Fetch all products ---
// --- @route  GET /api/products ---
// --- @access Public ---
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}); // Find all products
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server Error fetching products" });
  }
});

// --- @desc   Fetch single product by ID ---
// --- @route  GET /api/products/:id ---
// --- @access Public ---
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Get Product by ID Error:", error);
    // Handle invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }
    res.status(500).json({ message: "Server Error fetching product" });
  }
});

// --- @desc   Create a product ---
// --- @route  POST /api/products ---
// --- @access Private/Admin ---
router.post("/", protect, admin, async (req, res) => {
  const { name, description, price, countInStock, imageUrl, category, brand } =
    req.body;

  // Validation
  if (!name || !price || !category || !brand) {
    return res.status(400).json({
      message:
        "Please provide all required fields (name, price, category, brand)",
    });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      countInStock,
      imageUrl,
      category,
      brand,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(400).json({ message: "Error creating product" });
  }
});

// --- @desc   Update a product ---
// --- @route  PUT /api/products/:id ---
// --- @access Private/Admin ---
router.put("/:id", protect, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.imageUrl = req.body.imageUrl;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// --- @desc   Delete a product ---
// --- @route  DELETE /api/products/:id ---
// --- @access Private/Admin ---
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne({ _id: req.params.id });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
});

module.exports = router;
