import React, { useState } from "react";
// import "./AddExam.css";

function AddExam({ onExamAdded }) {
  const [form, setForm] = useState({
    courseId: "",
    examDate: "",
    duration: "",
    type: "Midterm",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add exam");

      alert("Exam added successfully!");
      setForm({ courseId: "", examDate: "", duration: "", type: "Midterm" });
      onExamAdded();
    } catch (error) {
      console.error("Error adding exam:", error);
      alert("Error adding exam");
    }
  };

  return (
    <div className="add-exam-container">
      <h2>Add New Exam</h2>
      <form onSubmit={handleSubmit} className="add-exam-form">
        <div className="form-row">
          <label>Course ID:</label>
          <input
            type="text"
            name="courseId"
            placeholder="Enter Course ID"
            value={form.courseId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Exam Date:</label>
          <input
            type="date"
            name="examDate"
            value={form.examDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Duration (mins):</label>
          <input
            type="number"
            name="duration"
            placeholder="Enter Duration"
            value={form.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Exam Type:</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Midterm">Midterm</option>
            <option value="Final">Final</option>
            <option value="Quiz">Quiz</option>
            <option value="Practical">Practical</option>
          </select>
        </div>

        <button type="submit">Add Exam</button>
      </form>
    </div>
  );
}

export default AddExam;
