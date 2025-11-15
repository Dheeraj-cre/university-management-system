import React, { useEffect, useState } from "react";

function EnrollmentPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({ studentId: "", courseId: "" });

  // Fetch students and courses
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then(setStudents)
      .catch((err) => console.error("Error fetching students:", err));

    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then(setCourses)
      .catch((err) => console.error("Error fetching courses:", err));

    fetchEnrollments();
  }, []);

  // Fetch all enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/enrollments");
      if (!res.ok) throw new Error("Failed to fetch enrollments");
      const data = await res.json();
      setEnrollments(data);
    } catch (err) {
      console.error("Error loading enrollments:", err);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add enrollment");

      alert("✅ Student enrolled successfully!");
      setForm({ studentId: "", courseId: "" });
      fetchEnrollments();
    } catch (err) {
      console.error("Error adding enrollment:", err);
      alert("❌ Error adding enrollment");
    }
  };

  return (
    <div className="enrollment-container" style={{ padding: "20px" }}>
      <h2>📚 Enrollment Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label>
          Select Student:
          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Student --</option>
            {students.map((s) => (
              <option key={s.studentId} value={s.studentId}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Select Course:
          <select
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Course --</option>
            {courses.map((c) => (
              <option key={c.courseId} value={c.courseId}>
                {c.courseName}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" style={{ marginLeft: "20px" }}>
          Enroll Student
        </button>
      </form>

      <h3>📋 Current Enrollments</h3>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Enrollment ID</th>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Enrollment Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.firstName} {e.lastName}</td>
              <td>{e.courseName}</td>
              <td>{new Date(e.enrollmentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnrollmentPage;
