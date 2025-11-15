import React, { useState } from "react";
import { updateStudent } from "../../../api/studentApi";
import "./UpdateStudent.css";

function UpdateStudent({ student, onUpdated }) {
  const [form, setForm] = useState(student);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateStudent(student.studentId, form);
    alert("Student updated successfully!");
    onUpdated();
  }

  return (
    <div className="update-student-container">
      <h3>Update Student</h3>
      <form onSubmit={handleSubmit} className="update-student-form">
        {Object.keys(form).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              id={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="update-btn">Update</button>
      </form>
    </div>
  );
}

export default UpdateStudent;
