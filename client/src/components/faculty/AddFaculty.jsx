import React, { useState } from "react";
import { addFaculty } from "../../api/facultyApi";
import "./AddFaculty.css"; // ✅ Import CSS

function AddFaculty({ onFacultyAdded }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    departmentId: "",
    hireDate: "",
    role: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addFaculty(form);
    alert("✅ Faculty added successfully!");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      departmentId: "",
      hireDate: "",
      role: ""
    });
    onFacultyAdded();
  }

  return (
    <div className="add-faculty-container">
      <h3>Add Faculty</h3>
      <form onSubmit={handleSubmit} className="add-faculty-form">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace(/([A-Z])/g, " $1")}
            value={form[key]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit" className="submit-btn">
          Add Faculty
        </button>
      </form>
    </div>
  );
}

export default AddFaculty;
