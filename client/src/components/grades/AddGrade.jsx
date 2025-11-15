import React, { useState } from "react";
import "./AddGrade.css";

function AddGrade({ onGradeAdded }) {
  const [form, setForm] = useState({
    studentId: "",
    courseId: "",
    semester: "",
    year: "",
    grade: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add grade");

      alert("Grade added successfully!");
      setForm({ studentId: "", courseId: "", semester: "", year: "", grade: "" });
      onGradeAdded();
    } catch (error) {
      console.error("Error adding grade:", error);
      alert("Error adding grade");
    }
  };

  return (
    <div className="add-grade-container">
      <h3>Add Grade</h3>
      <form onSubmit={handleSubmit} className="add-grade-form">
        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
        />
        <input
          name="courseId"
          placeholder="Course ID"
          value={form.courseId}
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
          name="grade"
          placeholder="Grade (A, B, C...)"
          value={form.grade}
          onChange={handleChange}
        />
        <button type="submit">Add Grade</button>
      </form>
    </div>
  );
}

export default AddGrade;
