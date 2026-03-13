const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ==========================
// CREATE ORDER (USER)
// ==========================
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
      orderStatus: "Pending",
      paymentStatus: "Paid",
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Order creation failed" });
  }
});

// ==========================
// GET USER ORDERS (MY ORDERS)
// ==========================
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product",
      "name price imageUrl",
    );

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ==========================
// GET ALL ORDERS (ADMIN)
// ==========================
router.get("/admin", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price imageUrl");

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ==========================
// UPDATE ORDER STATUS (ADMIN)
// ==========================
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = req.body.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Status update failed" });
  }
});

// ==========================
// CANCEL ORDER (USER)
// ==========================
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (order.orderStatus !== "Pending") {
      return res.status(400).json({ message: "Order cannot be cancelled" });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Cancel order failed" });
  }
});

module.exports = router;
