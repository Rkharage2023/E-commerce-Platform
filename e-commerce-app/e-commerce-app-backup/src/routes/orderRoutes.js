import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
const router = express.Router();

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
      status: "Pending",
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
// GET USER ORDERS
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

    order.status = req.body.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
});

// ==========================
// CANCEL ORDER
// ==========================
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    order.status = "Cancelled";

    await order.save();

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cancel order failed" });
  }
});

// ==========================
// ASSIGN ORDER TO EMPLOYEE
// ==========================
router.put("/:id/assign", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.assignedEmployee = req.body.employeeId;
    order.status = "Shipped";

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Order assignment failed" });
  }
});

// ==========================
// GET EMPLOYEE ORDERS
// ==========================
router.get("/employee/orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      assignedEmployee: req.user._id,
      status: "Shipped",
    }).populate("items.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee orders" });
  }
});

// ==========================
// EMPLOYEE MARK DELIVERED
// ==========================
router.put("/employee/orders/:id/deliver", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.assignedEmployee.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    order.status = "Delivered";

    await order.save();

    res.json({ message: "Order delivered" });
  } catch (error) {
    res.status(500).json({ message: "Delivery update failed" });
  }
});

export default router;
