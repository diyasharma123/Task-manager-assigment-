const express = require("express");
const router = express.Router();
const { createTask, getProjectTasks, updateTaskStatus } = require("../controllers/taskController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Only Admins can create tasks
router.post("/create", verifyToken, isAdmin, createTask);

router.get("/project/:projectId", verifyToken, getProjectTasks);

// Any logged-in member can update the status of a task
router.put("/:taskId/status", verifyToken, updateTaskStatus);

module.exports = router;
