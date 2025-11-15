import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // (optional shared CSS file for all logins)

function FacultyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/faculty/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        //  Save faculty details to localStorage
        localStorage.setItem("facultyToken", data.token);
        localStorage.setItem("facultyId", data.faculty.facultyId);
        localStorage.setItem("facultyName", data.faculty.firstName);
        localStorage.setItem("facultyEmail", data.faculty.email);

        alert("Login successful!");
        navigate("/faculty/portal"); // redirect to faculty portal/dashboard
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2> Faculty Login</h2>
        <p>Access your teaching dashboard and manage your courses</p>

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
          <a href="/login/faculty-signup" className="link">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default FacultyLogin;
