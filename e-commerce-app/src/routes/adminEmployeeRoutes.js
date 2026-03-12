const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// GET ALL EMPLOYEES
router.get("/", protect, admin, async (req, res) => {
  const employees = await User.find({ role: "employee" });
  res.json(employees);
});

function generateTempPassword() {
  return Math.random().toString(36).slice(-8);
}

// CREATE EMPLOYEE
router.post("/", protect, admin, async (req, res) => {
  const { name, email } = req.body;

  const tempPassword = generateTempPassword();

  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const employee = new User({
    name,
    email,
    password: hashedPassword,
    role: "employee",
  });

  await employee.save();

  res.json({
    message: "Employee created",
    tempPassword,
  });
});

// DELETE EMPLOYEE
router.delete("/:id", protect, admin, async (req, res) => {
  const employee = await User.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  await employee.deleteOne();

  res.json({ message: "Employee removed" });
});

router.post("/invite", async (req, res) => {
  const { name, email } = req.body;

  let user = await User.findOne({ email });

  const token = crypto.randomBytes(32).toString("hex");

  if (!user) {
    user = await User.create({
      name,
      email,
      role: "employee",
      inviteToken: token,
      inviteTokenExpire: Date.now() + 24 * 60 * 60 * 1000,
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
    `Click here to create password: <a href="${link}">${link}</a>`,
  );

  res.json({ message: "Invitation email sent" });
});

module.exports = router;
