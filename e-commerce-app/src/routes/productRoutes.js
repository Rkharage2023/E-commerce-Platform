const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ==========================
// GET ALL PRODUCTS
// ==========================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server error fetching products" });
  }
});

// ==========================
// GET PRODUCT BY ID
// ==========================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server error fetching product" });
  }
});

// ==========================
// CREATE PRODUCT (ADMIN)
// ==========================

router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      countInStock,
      imageUrl,
      category,
      brand,
    } = req.body;

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
    console.error(error);

    res.status(500).json({ message: "Product creation failed" });
  }
});

// ==========================
// UPDATE PRODUCT
// ==========================

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.imageUrl = req.body.imageUrl;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Product update failed" });
  }
});

// ==========================
// DELETE PRODUCT
// ==========================

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne({ _id: req.params.id });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Delete product failed" });
  }
});

export default router;