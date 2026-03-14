const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// GET ALL EMPLOYEES
// router.get("/", protect, admin, async (req, res) => {
//   const employees = await User.find({ role: "employee" });
//   res.json(employees);
// });

function generateTempPassword() {
  return Math.random().toString(36).slice(-8);
}

router.get("/", async (req, res) => {
  const employees = await User.find({ role: "employee" }).select("-password");

  res.json(employees);
});

// CREATE EMPLOYEE
router.post("/", protect, admin, async (req, res) => {
  const { name, email } = req.body;

  const tempPassword = generateTempPassword();

  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const employee = await User.create({
    name,
    email,
    hashedPassword,
    role: "employee",
  });

  await employee.save();

  res.json({
    message: "Employee created",
    tempPassword,
  });
});

router.put("/:id/pay-salary", protect, admin, async (req, res) => {
  const employee = await User.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employee.salary += req.body.amount;

  await employee.save();

  res.json({
    message: "Salary paid successfully",
    salary: employee.salary,
  });
});

router.put("/:id", protect, admin, async (req, res) => {
  const employee = await User.findById(req.params.id);

  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.salary = req.body.salary;

  await employee.save();

  res.json(employee);
});

// UPDATE EMPLOYEE
router.put("/:id", protect, admin, async (req, res) => {
  const employee = await User.findById(req.params.id);

  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.salary = req.body.salary;

  await employee.save();

  res.json(employee);
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

module.exports = router;
