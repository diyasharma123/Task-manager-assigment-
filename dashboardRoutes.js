const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const { verifyToken } = require("../middleware/authMiddleware");

// Get dashboard data for the logged-in user
router.get("/", verifyToken, getDashboardStats);

module.exports = router;