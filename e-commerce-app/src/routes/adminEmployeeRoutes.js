import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import { protect } from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

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
// SEND EMPLOYEE INVITE
// NOTE: This route MUST be defined before POST "/" to avoid Express
// matching "/invite" as an employee creation request.
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

    const link = `${process.env.CLIENT_URL}/set-password/${token}`;

    await sendEmail(
      email,
      "Employee Invitation - ShopHub",
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">You're invited to ShopHub!</h2>
        <p>Hi ${name},</p>
        <p>You have been invited to join ShopHub as an employee.</p>
        <p>Click the button below to set your password and activate your account:</p>
        <a href="${link}" 
           style="display: inline-block; background: #2563eb; color: white; 
                  padding: 12px 24px; border-radius: 8px; text-decoration: none; 
                  margin: 16px 0;">
          Set Password
        </a>
        <p style="color: #666; font-size: 14px;">
          This link expires in 24 hours.
        </p>
        <p style="color: #666; font-size: 12px;">
          If the button doesn't work, copy this link: ${link}
        </p>
      </div>
      `,
    );

    res.json({ message: "Invite sent successfully" });
  } catch (error) {
    // Log the actual error so you can see it in Render logs
    console.error("Invite Error:", error.message);
    res.status(500).json({
      message: "Failed to send invite email",
      error: error.message, // Shows actual error in response
    });
  }
});

// ==========================
// CREATE EMPLOYEE
// ==========================
// CREATE EMPLOYEE
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if employee already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }

    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const employee = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      inviteStatus: "Pending",
    });

    res.json({
      message: "Employee created successfully",
      tempPassword,
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
      },
    });
  } catch (error) {
    console.error("Create Employee Error:", error.message);
    res.status(500).json({
      message: "Employee creation failed",
      error: error.message,
    });
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

export default router;
