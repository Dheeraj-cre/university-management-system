import React, { useEffect, useState, useCallback } from "react";
import "./StudentEnrollment.css";

function StudentEnrollment() {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("studentId");

  //  Fetch all available courses
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/enrollments/courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  }, []);

  //  Fetch only this student's enrolled courses
  const fetchEnrolled = useCallback(async () => {
    if (!studentId) {
      console.warn("⚠️ No studentId found in localStorage");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/enrollments/student/${studentId}`);
      const data = await res.json();
      console.log(" Enrolled data for student", studentId, data);
      setEnrolled(data);
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  //  Enroll in a course
  const handleEnroll = async (courseId) => {
    if (!studentId) return alert("⚠️ No student logged in!");

    try {
      const res = await fetch("http://localhost:5000/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, courseId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(" " + data.message);
        fetchEnrolled();
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (err) {
      console.error("Error enrolling:", err);
    }
  };

  //  Load data when page opens
  useEffect(() => {
    fetchCourses();
    fetchEnrolled();
  }, [fetchCourses, fetchEnrolled]);

  //  Helper: check if already enrolled
  const isEnrolled = (courseId) => enrolled.some((e) => e.courseId === courseId);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="student-enrollment-container">
      <h2> Course Enrollment</h2>
      <p style={{fontWeight: "bold"}}>Welcome! You can enroll in available courses below.</p>

      {/* === Available Courses === */}
      <h3>Available Courses</h3>
      <table className="enrollment-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.courseId}>
              <td>{c.courseCode}</td>
              <td>{c.courseName}</td>
              <td>
                {isEnrolled(c.courseId) ? (
                  <button className="btn-enrolled" disabled>
                     Enrolled
                  </button>
                ) : (
                  <button className="btn-enroll" onClick={() => handleEnroll(c.courseId)}>
                    Enroll
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === Enrolled Courses === */}
      <h3 style={{ marginTop: "40px" }}> My Enrolled Courses</h3>
      {enrolled.length === 0 ? (
        <p>You haven’t enrolled in any courses yet.</p>
      ) : (
        <table className="enrollment-table">
          <thead>
            <tr>
              <th>Enrollment ID</th>
              <th>Course Name</th>
              <th>Course Code</th>
            </tr>
          </thead>
          <tbody>
            {enrolled.map((e) => (
              <tr key={e.enrollmentId}>
                <td>{e.enrollmentId}</td>
                <td>{e.courseName}</td>
                <td>{e.courseCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentEnrollment;
