import React, { useEffect, useState } from "react";
import "./FacultyPortal.css";

function FacultyPortal() {
  const [faculty, setFaculty] = useState({});
  const [courses, setCourses] = useState([]);
  const facultyId = localStorage.getItem("facultyId");

  useEffect(() => {
    if (!facultyId) return;

    const fetchProfile = async () => {
      const res = await fetch(`http://localhost:5000/api/faculty/profile/${facultyId}`);
      const data = await res.json();
      setFaculty(data);
    };

    const fetchCourses = async () => {
      const res = await fetch(`http://localhost:5000/api/faculty/courses/${facultyId}`);
      const data = await res.json();
      setCourses(data.courses || []);
    };

    fetchProfile();
    fetchCourses();
  }, [facultyId]);

  return (
    <div className="faculty-portal-container">
      <h1>👩‍🏫 Welcome, {faculty.firstName || "Faculty"}!</h1>
      <p>Email: {faculty.email}</p>

      <h2 style={{ marginTop: "20px" }}>📘 Assigned Courses</h2>
      {courses.length === 0 ? (
        <p>No courses assigned yet.</p>
      ) : (
        <table className="faculty-courses-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.courseId}>
                <td>{c.courseCode}</td>
                <td>{c.courseName}</td>
                <td>{c.credits}</td>
                <td>{c.departmentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FacultyPortal;
