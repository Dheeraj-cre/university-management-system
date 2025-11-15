import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/student/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        //  Save everything — including studentId
        localStorage.setItem("studentToken", data.token);
        localStorage.setItem("studentId", data.student.studentId); // <-- Important
        localStorage.setItem("studentName", data.student.firstName);
        localStorage.setItem("studentEmail", data.student.email);

        alert("Login successful!");
        navigate("/student/portal");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2> Student Login</h2>
        <p>Access your portal to view attendance, courses, and results</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account?{" "}
          <a href="/login/student-signup" className="link">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;
