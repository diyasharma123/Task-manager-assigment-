const express = require("express");
const router = express.Router();
const { createProject, getProjects } = require("../controllers/projectController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Only admins can create projects
router.post("/create", verifyToken, isAdmin, createProject);

// Any logged-in user can view their projects
router.get("/", verifyToken, getProjects);

module.exports = router;
