import React, { useState } from "react";
import { updateFaculty } from "../../api/facultyApi";
import "./UpdateFaculty.css";

function UpdateFaculty({ faculty, onUpdated }) {
  const [form, setForm] = useState(faculty);

  // Handle input change dynamically
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateFaculty(faculty.facultyId, form);
      alert("Faculty updated successfully!");
      onUpdated();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update faculty. Please check the console for details.");
    }
  }

  return (
    <div className="update-faculty-container">
      <h3>Update Faculty</h3>
      <form onSubmit={handleSubmit} className="update-faculty-form">
        {Object.keys(form).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
            </label>
            <input
              id={key}
              name={key}
              value={form[key] ?? ""}
              onChange={handleChange}
              className="form-input"
              disabled={key === "facultyId"} // prevent editing the ID
            />
          </div>
        ))}
        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateFaculty;
