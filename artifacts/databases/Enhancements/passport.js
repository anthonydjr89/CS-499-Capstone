const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Users = require("../models/user");
const User = mongoose.model("users");

// ENHANCEMENT – Renamed q → user for clarity
// ENHANCEMENT – Added simple in-memory rate-limit to slow brute-force attempts
let loginAttempts = {};
const LIMIT = 5;
const WINDOW_MS = 60000; // 1 minute

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      const email = username.toLowerCase();
      const now = Date.now();

      if (
        loginAttempts[email] &&
        loginAttempts[email].count >= LIMIT &&
        now - loginAttempts[email].time < WINDOW_MS
      ) {
        return done(null, false, {
          message: "Too many failed attempts. Please wait and try again."
        });
      }

      try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
          recordFailure(email, now);
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          recordFailure(email, now);
          return done(null, false, { message: "Incorrect password." });
        }

        loginAttempts[email] = { count: 0, time: now }; // reset on success
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

function recordFailure(email, time) {
  if (!loginAttempts[email]) loginAttempts[email] = { count: 0, time };
  loginAttempts[email].count++;
  loginAttempts[email].time = time;
}
