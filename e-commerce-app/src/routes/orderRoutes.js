const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

// GET USER ORDERS
router.get("/admin", protect, admin, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product", "name price imageUrl");

  res.json(orders);
});

router.get("/myorders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "items.product",
    "name price imageUrl",
  );

  res.json(orders);
});

// UPDATE ORDER STATUS (ADMIN)
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
});

// CANCEL ORDER (USER)
router.put("/:id/cancel", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Only owner can cancel
  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // Only pending orders can be cancelled
  if (order.status !== "Pending") {
    return res.status(400).json({ message: "Order cannot be cancelled" });
  }

  order.status = "Cancelled";

  await order.save();

  res.json({ message: "Order cancelled successfully" });
});

module.exports = router;
