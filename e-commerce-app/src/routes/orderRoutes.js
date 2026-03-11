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
router.get("/myorders", protect, async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.json(orders);
});

router.put("/:id/deliver", protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = "Delivered";

  await order.save();

  res.json(order);
});

module.exports = router;
