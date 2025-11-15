import React, { useState } from "react";
import { addStudent } from "../../../api/studentApi";
import "./AddStudent.css";

function AddStudent({ onAdded }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    enrollmentDate: "",
    departmentId: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(form);
    alert("Student added successfully!");
    setForm({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      enrollmentDate: "",
      departmentId: "",
    });
    onAdded();
  };

  return (
    <div className="add-student-container">
      <h2>Add Student</h2>
      <form className="add-student-form" onSubmit={handleSubmit}>
        <table className="add-student-table">
          <tbody>
            <tr>
              <td><label>First Name:</label></td>
              <td><input name="firstName" value={form.firstName} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Last Name:</label></td>
              <td><input name="lastName" value={form.lastName} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Date of Birth:</label></td>
              <td><input type="date" name="dob" value={form.dob} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Gender:</label></td>
              <td>
                <select name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Email:</label></td>
              <td><input type="email" name="email" value={form.email} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Phone:</label></td>
              <td><input name="phone" value={form.phone} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Address:</label></td>
              <td><input name="address" value={form.address} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Enrollment Date:</label></td>
              <td><input type="date" name="enrollmentDate" value={form.enrollmentDate} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Department ID:</label></td>
              <td><input name="departmentId" value={form.departmentId} onChange={handleChange} required /></td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="add-btn">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
