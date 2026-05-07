const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const TOKEN_TTL = "7d";

function signUserToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );
}

function signAdminToken(email) {
  return jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_TTL,
  });
}

router.post("/register", async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
      address,
      country,
      stateProvince,
      city,
      zipCode,
      dob,
      houseAddress,
      phone,
      accountType,
      ssn,
      govId,
    } = req.body || {};

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      passwordHash,
      address,
      country,
      stateProvince,
      city,
      zipCode,
      dob,
      houseAddress,
      phone,
      accountType,
      ssn,
      govId,
    });

    res.status(201).json({
      message: "Account created. Pending admin approval.",
      user: user.toPublic(),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });

    if (user.status !== "Approved") {
      return res.status(403).json({ error: "Your account is pending admin approval" });
    }

    user.lastActive = new Date();
    await user.save();

    res.json({
      token: signUserToken(user),
      user: user.toPublic(),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/admin-login", (req, res) => {
  const { email, password } = req.body || {};
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ token: signAdminToken(email) });
  }
  res.status(401).json({ error: "Invalid admin credentials" });
});

module.exports = router;
