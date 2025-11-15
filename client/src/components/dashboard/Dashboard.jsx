import React, { useEffect, useState } from "react";
// import Charts from "./Charts";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    faculty: 0,
    fees: 0,
    payments: 0,
  });
  // const [studentData, setStudentData] = useState([]);
  // const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const data = await res.json();

        setStats(data);
        // setFinanceData([
        //   { name: "Fees Due", value: data.fees - data.payments },
        //   { name: "Payments Received", value: data.payments },
        // ]);

        // setStudentData([
        //   { department: "Computer Science", students: 120 },
        //   { department: "Commerce", students: 80 },
        //   { department: "Arts", students: 60 },
        //   { department: "Engineering", students: 100 },
        // ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1> University Management Dashboard</h1>

      <div className="stats-grid">
        <div className="card"><h3>Students</h3><p>{stats.students}</p></div>
        <div className="card"><h3>Courses</h3><p>{stats.courses}</p></div>
        <div className="card"><h3>Faculty</h3><p>{stats.faculty}</p></div>
        <div className="card"><h3>Total Fees</h3><p>₹{stats.fees}</p></div>
        <div className="card"><h3>Payments</h3><p>₹{stats.payments}</p></div>
      </div>

      {/* <Charts studentData={studentData} financeData={financeData} /> */}
    </div>
  );
}

export default Dashboard;
