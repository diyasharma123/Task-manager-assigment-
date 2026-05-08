import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetch data from your backend
    const fetchDashboard = async () => {
      const response = await fetch("http://localhost:5000/api/dashboard", {
        headers: { "Authorization":` Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setDashboardData(data);
    };

    fetchDashboard();
  }, [token]);

  if (!dashboardData) return <h2>Loading dashboard...</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Welcome to your Dashboard</h2>
        <button onClick={logout} style={{ height: "40px", cursor: "pointer" }}>Logout</button>
      </div>

      
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Tasks</h3>
          <h1>{dashboardData.stats.totalTasks}</h1>
        </div>
        <div style={cardStyle}>
          <h3>Pending</h3>
          <h1>{dashboardData.stats.pending}</h1>
        </div>
        <div style={cardStyle}>
          <h3>In Progress</h3>
          <h1>{dashboardData.stats.inProgress}</h1>
        </div>
      </div>

      
      <h3 style={{ marginTop: "40px" }}>Your Tasks</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {dashboardData.tasks.map(task => (
          <li key={task._id} style={{ padding: "15px", border: "1px solid #ccc", marginBottom: "10px", borderRadius: "8px" }}>
            <strong>{task.title}</strong> - Status: <em>{task.status}</em>
            <p style={{ margin: "5px 0" }}>Project: {task.project?.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  textAlign: "center",
  flex: 1,
  backgroundColor: "#f9f9f9"
};