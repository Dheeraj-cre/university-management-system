import React, { useState } from "react";
import { addDepartment } from "../../../api/departmentApi";
import "./AddDepartment.css";

function AddDepartment({ onAdded }) {
  const [form, setForm] = useState({
    departmentName: "",
    headOfDepartment: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDepartment(form);
    alert("Department added successfully!");
    setForm({ departmentName: "", headOfDepartment: "", location: "" });
    onAdded();
  };

  return (
    <div className="add-department-container">
      <h2>Add Department</h2>
      <form className="add-department-form" onSubmit={handleSubmit}>
        <input
          name="departmentName"
          placeholder="Department Name"
          value={form.departmentName}
          onChange={handleChange}
          required
        />
        <input
          name="headOfDepartment"
          placeholder="Head of Department"
          value={form.headOfDepartment}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
}

export default AddDepartment;
