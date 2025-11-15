import React, { useState } from "react";
import "./AddAttendance.css";

function AddAttendance({ onAdded }) {
  const [form, setForm] = useState({
    studentId: "",
    courseId: "",
    date: "",
    status: "Present"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add attendance");

      alert("Attendance added successfully!");
      setForm({ studentId: "", courseId: "", date: "", status: "Present" });
      onAdded();
    } catch (error) {
      console.error("Error adding attendance:", error);
      alert("Error adding attendance");
    }
  };

  return (
    <div className="add-attendance-container">
      <h3>Add Attendance</h3>
      <form onSubmit={handleSubmit} className="add-attendance-form">
        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          required
        />
        <input
          name="courseId"
          placeholder="Course ID"
          value={form.courseId}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <button type="submit" className="btn-submit">Add Attendance</button>
      </form>
    </div>
  );
}

export default AddAttendance;
