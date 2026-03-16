const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ==========================
// GENERATE TEMP PASSWORD
// ==========================
function generateTempPassword() {
  return Math.random().toString(36).slice(-8);
}

// ==========================
// GET ALL EMPLOYEES
// ==========================
router.get("/", protect, admin, async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

// ==========================
// CREATE EMPLOYEE
// ==========================
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, email } = req.body;

    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const employee = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
    });

    res.json({
      message: "Employee created",
      tempPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Employee creation failed" });
  }
});

// ==========================
// PAY SALARY
// ==========================
router.put("/:id/pay-salary", protect, admin, async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.salary = (employee.salary || 0) + Number(req.body.amount);

    await employee.save();

    res.json({
      message: "Salary paid successfully",
      salary: employee.salary,
    });
  } catch (error) {
    res.status(500).json({ message: "Salary payment failed" });
  }
});

// ==========================
// UPDATE EMPLOYEE
// ==========================
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.salary = req.body.salary ?? employee.salary;

    await employee.save();

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Employee update failed" });
  }
});

// ==========================
// DELETE EMPLOYEE
// ==========================
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.deleteOne();

    res.json({ message: "Employee removed" });
  } catch (error) {
    res.status(500).json({ message: "Delete employee failed" });
  }
});

// ==========================
// SEND EMPLOYEE INVITE
// ==========================
router.post("/invite", protect, admin, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    let user = await User.findOne({ email });

    const token = crypto.randomBytes(32).toString("hex");

    if (!user) {
      user = await User.create({
        name,
        email,
        role: "employee",
        inviteToken: token,
        inviteTokenExpire: Date.now() + 24 * 60 * 60 * 1000,
        inviteStatus: "Pending",
      });
    } else {
      user.inviteToken = token;
      user.inviteTokenExpire = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();
    }

    const link = `http://localhost:3000/set-password/${token}`;

    await sendEmail(
      email,
      "Employee Invitation",
      `
<h3>You are invited to the Admin Panel</h3>
<p>Click the link below to create your password</p>
<a href="${link}">${link}</a>
`,
    );

    res.json({ message: "Invite sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send invite email" });
  }
});

export default router;
