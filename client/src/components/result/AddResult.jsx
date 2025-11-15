import React, { useState } from "react";
import "./AddResult.css";

function AddResult({ onAdded }) {
  const [form, setForm] = useState({
    studentId: "",
    semester: "",
    year: "",
    gpa: "",
    status: "Pass",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add result");
      alert("Result added successfully!");
      setForm({ studentId: "", semester: "", year: "", gpa: "", status: "Pass" });
      onAdded();
    } catch (error) {
      console.error("Error adding result:", error);
      alert("Error adding result");
    }
  };

  return (
    <div className="add-result-container">
      <h3>Add Result</h3>
      <form onSubmit={handleSubmit} className="add-result-form">
        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
        />
        <input
          name="semester"
          placeholder="Semester"
          value={form.semester}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />
        <input
          type="number"
          name="gpa"
          step="0.01"
          placeholder="GPA"
          value={form.gpa}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        <button type="submit">Add Result</button>
      </form>
    </div>
  );
}

export default AddResult;
