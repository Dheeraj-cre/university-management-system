import React, { useState } from "react";
import "./Login.css";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // To show error messages
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submit
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show backend error message if login fails
        const message = data.error || "Invalid email or password";
        setError(message);
        return;
      }

      // Save token and admin name
      localStorage.setItem("token", data.token);
      const adminName = data.name || "Dheeraj";
      localStorage.setItem("adminName", adminName);

      alert(` Welcome back, ${adminName}!`);
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (err) {
      console.error(err);
      setError(" Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2> Admin Login</h2>
        <p>Access your University Management Dashboard</p>

        {/* Show error messages */}
        {error && <p className="error-message">⚠️ {error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? " Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
