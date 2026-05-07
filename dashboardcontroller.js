const Task = require("../models/Task");

exports.getDashboardStats = async (req, res) => {
  try {
  
    const userTasks = await Task.find({ assignedTo: req.user.id }).populate("project", "name");

   
    const stats = {
      totalTasks: userTasks.length,
      pending: userTasks.filter(task => task.status === "Pending").length,
      inProgress: userTasks.filter(task => task.status === "In Progress").length,
      completed: userTasks.filter(task => task.status === "Completed").length,
      overdue: userTasks.filter(task => task.status === "Overdue").length,
    };

    res.json({
      message: "Dashboard data fetched successfully",
      stats,
      tasks: userTasks 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};