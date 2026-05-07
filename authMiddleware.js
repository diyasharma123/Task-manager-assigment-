const jwt = require("jsonwebtoken");

// 1. Verify if the user is logged in
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    // Note: Use your actual secret from your .env file here
    const verified = jwt.verify(token.replace("Bearer ", ""), "secret123");
    req.user = verified; // This contains the { id, role } we signed in the login controller
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// 2. Verify if the user is an Admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};