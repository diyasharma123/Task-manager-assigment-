const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


app.use(express.json());
const cors = require("cors");
app.use(cors());

// ✅ Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected Successfully!"))
  .catch((err) => console.log("❌ DB ERROR: ", err));

// ✅ All Application Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));          
app.use("/api/dashboard", require("./routes/dashboardRoutes")); 

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});