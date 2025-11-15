import React, { useState, useEffect } from "react";
import "./FacultyAssignment.css";

function FacultyAssignment() {
  const [facultyList, setFacultyList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ faculty_id: "", course_id: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/faculty")
      .then(res => res.json())
      .then(data => setFacultyList(data));

    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(data => setCourseList(data));

    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    fetch("http://localhost:5000/api/faculty-assignment")
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error("Error fetching assignments:", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/faculty-assignment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    fetchAssignments();
    setForm({ faculty_id: "", course_id: "" });
  };

  const deleteAssignment = async (id) => {
    await fetch(`http://localhost:5000/api/faculty-assignment/${id}`, {
      method: "DELETE",
    });
    fetchAssignments();
  };

  return (
    <div className="assignment-container">
      <h2>📘 Faculty Course Assignment</h2>

      <form onSubmit={handleSubmit} className="assignment-form">
        <select name="faculty_id" value={form.faculty_id} onChange={handleChange} required>
          <option value="">Select Faculty</option>
          {facultyList.map((f) => (
            <option key={f.facultyId} value={f.facultyId}>
              {f.firstName}
            </option>
          ))}
        </select>

        <select name="course_id" value={form.course_id} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courseList.map((c) => (
            <option key={c.courseId} value={c.courseId}>
              {c.courseName}
            </option>
          ))}
        </select>

        <button type="submit">Assign</button>
      </form>

      <table className="assignment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Faculty</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.faculty_name}</td>
              <td>{a.course_name} ({a.course_code})</td>
              <td>
                <button onClick={() => deleteAssignment(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacultyAssignment;
