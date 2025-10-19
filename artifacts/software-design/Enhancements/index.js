const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");
const jwt = require("jsonwebtoken");



// ENHANCEMENT – Finished authenticateJWT: verify Bearer token and return uniform JSON on failure
function authenticateJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ code: "AUTH_REQUIRED", message: "Valid token required" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ code: "AUTH_INVALID", message: "Token invalid or expired" });
    }
    req.user = decoded;
    next();
  });
}



// ENHANCEMENT – Added role/authorization support
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ code: "FORBIDDEN", message: "Admin privileges required" });
    }
    next();
  };
}



// Public routes
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// Public route: anyone can view trips
router.route("/trips").get(tripsController.tripsList);

// Protected admin-only routes
router
  .route("/trips")
  .post(authenticateJWT, requireRole("admin"), tripsController.tripsAddTrip);

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode) // Public GET
  .put(authenticateJWT, requireRole("admin"), tripsController.tripsUpdateTrip);

module.exports = router;
