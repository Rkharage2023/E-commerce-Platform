const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

    res.status(500).json({
      message: "Server Error during registration",
    });
  }
});

// ==========================
// LOGIN USER
// ==========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Server Error during login",
    });
  }
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
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.inviteStatus = "Active";
    user.inviteToken = undefined;
    user.inviteTokenExpire = undefined;

    await user.save();

    res.json({
      message: "Password set successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Password setup failed",
    });
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

    const redirectUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/google-success?token=${token}`;

    res.redirect(redirectUrl);
  },
);

export default router;