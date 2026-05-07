const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;
   
    const project = await Project.create({
      name,
      description,
      admin: req.user.id, // ID from the JWT token
      members
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
    try {
     
      const projects = await Project.find({
        $or: [{ admin: req.user.id }, { members: req.user.id }]
      }).populate('members', 'name email'); 
     
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};