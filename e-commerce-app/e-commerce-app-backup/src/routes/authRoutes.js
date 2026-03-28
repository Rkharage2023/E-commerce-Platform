import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// GENERATE JWT TOKEN
// ==========================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ==========================
// REGISTER USER
// ==========================
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Hash password once here — no pre-save hook on model
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error during registration" });
  }
});

// ==========================
// LOGIN USER
// ==========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Password incorrect" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// ==========================
// GET CURRENT USER PROFILE
// Used by GoogleSuccess to fetch user data after OAuth redirect
// ==========================
router.get("/profile", protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

// ==========================
// SET EMPLOYEE PASSWORD
// ==========================
router.post("/set-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      inviteToken: req.params.token,
      inviteTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Hash password once here
    user.password = await bcrypt.hash(password, 10);
    user.inviteStatus = "Active";
    user.inviteToken = undefined;
    user.inviteTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password set successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Password setup failed" });
  }
});

// ==========================
// GOOGLE LOGIN
// ==========================
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// ==========================
// GOOGLE CALLBACK
// ==========================
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    // Single redirect only — removed the duplicate res.redirect(redirectUrl) bug
    res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
  },
);

export default router;
