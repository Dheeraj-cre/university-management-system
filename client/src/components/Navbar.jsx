import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const admin = localStorage.getItem("adminName");
    const student = localStorage.getItem("studentName");
    setAdminName(admin);
    setStudentName(student);
  }, [location]);

  const handleLogout = () => {
    if (adminName) {
      localStorage.removeItem("adminName");
      localStorage.removeItem("token");
      window.location.href = "/login/admin";
    } else if (studentName) {
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentToken");
      localStorage.removeItem("studentEmail");
      window.location.href = "/login/student";
    }
  };

  const goToDashboard = () => {
    if (adminName) navigate("/dashboard");
    else if (studentName) navigate("/student/portal");
  };

  const showToggle =
    adminName &&
    !["/", "/about", "/login/admin", "/login/student", "/admission/apply"].includes(
      location.pathname.toLowerCase()
    );

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {showToggle && (
          <button className="menu-btn" onClick={onToggleSidebar}>
            ☰
          </button>
        )}
        <span className="brand"> University Management Portal</span>
      </div>

      <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/admission/apply" className="nav-link">Apply</Link>



        {/* Logged in Student */}
        {studentName ? (
          <>
            <button className="nav-link student-name-btn" onClick={goToDashboard}>
               {studentName}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : adminName ? (
          <>
            <button className="nav-link admin-name-btn" onClick={goToDashboard}>
               {adminName}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          // Login options if not logged in
          <div className="dropdown">
            <button className="dropbtn">Login ▼</button>
            <div className="dropdown-content">
              <Link to="/login/student">Student Login</Link>
              <Link to="/login/faculty">Faculty Login</Link>
              <Link to="/login/admin">Admin Login</Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
