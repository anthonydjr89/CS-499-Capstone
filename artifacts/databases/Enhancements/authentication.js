const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

// ENHANCEMENT – In register: clearer variable names, no raw DB errors exposed, return { token } only
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: ''
    });

    newUser.setPassword(req.body.password);
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(400).json({ message: "Unable to register user" });
    }

    const token = newUser.generateJWT();
    return res.status(200).json({ token }); // standardized
  } catch (err) {
    console.error("Registration error:", err.message);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

// ENHANCEMENT – In login: log attempts (no sensitive info) + basic back-off
let failedAttempts = {};
const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 60000; // 1 minute

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const email = req.body.email.toLowerCase();
  const now = Date.now();

  if (failedAttempts[email] && failedAttempts[email].count >= MAX_ATTEMPTS && now - failedAttempts[email].time < COOLDOWN_MS) {
    return res.status(429).json({ message: "Too many failed attempts, please wait before retrying" });
  }

  console.log(`Login attempt for: ${email}`);

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error("Auth error:", err.message);
      return res.status(500).json({ message: "Server error during login" });
    }

    if (user) {
      const token = user.generateJWT();
      failedAttempts[email] = { count: 0, time: now }; // reset counter
      res.status(200).json({ token });
    } else {
      if (!failedAttempts[email]) failedAttempts[email] = { count: 0, time: now };
      failedAttempts[email].count++;
      failedAttempts[email].time = now;

      res.status(401).json({ message: "Invalid credentials" });
    }
  })(req, res);
};

module.exports = {
  register,
  login
};
