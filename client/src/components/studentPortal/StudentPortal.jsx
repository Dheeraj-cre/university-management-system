import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./StudentPortal.css";


// Student Portal Component
function StudentPortal() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();


  // On component mount, check authentication
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    const studentName = localStorage.getItem("studentName");
    const studentEmail = localStorage.getItem("studentEmail");


    // Redirect to login if not authenticated
    if (!token) {
      alert("Please login first");
      navigate("/login/student");
    } else {
      setStudent({ name: studentName, email: studentEmail });
    }
  }, [navigate]);


  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/student");
  };

  // Render component

  return (
    <div className="student-portal-wrapper">
      {/* Sidebar */}
      <aside className="student-sidebar">
        <h2> Student Portal</h2>
        <nav>
          <Link to="/student/attendance" className="sidebar-item"> View Attendance</Link>
          <Link to="/student/enrollment" className="sidebar-item"> Course Enrollment</Link>
          <Link to="/admission/apply" className="sidebar-item"> Apply Admission</Link>
          <Link to="/admission/status" className="sidebar-item"> Admission Status</Link>
          <button className="sidebar-logout" onClick={handleLogout}> Logout</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="student-main">
        {student ? (
          <>
            <h1>Welcome, {student.name || "Student"} </h1>
            <p>Email: {student.email}</p>
            <p>Use the sidebar to navigate through your student features.</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
}

export default StudentPortal;
