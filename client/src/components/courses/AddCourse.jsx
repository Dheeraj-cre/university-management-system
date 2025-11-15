import React, { useState } from "react";
import { addCourse } from "../../api/courseApi";
import "./AddCourse.css";

function AddCourse({ onCourseAdded }) {
  const [form, setForm] = useState({
    courseName: "",
    courseCode: "",
    credits: "",
    departmentId: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addCourse(form);
    alert("Course added successfully!");
    setForm({
      courseName: "",
      courseCode: "",
      credits: "",
      departmentId: "",
    });
    onCourseAdded();
  }

  return (
    <div className="add-course-container">
      <h3>Add New Course</h3>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            id="courseName"
            name="courseName"
            placeholder="Enter course name"
            value={form.courseName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseCode">Course Code</label>
          <input
            id="courseCode"
            name="courseCode"
            placeholder="Enter course code"
            value={form.courseCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="credits">Credits</label>
          <input
            id="credits"
            name="credits"
            placeholder="Enter number of credits"
            value={form.credits}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="departmentId">Department ID</label>
          <input
            id="departmentId"
            name="departmentId"
            placeholder="Enter department ID"
            value={form.departmentId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
