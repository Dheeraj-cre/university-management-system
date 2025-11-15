import React, { useEffect, useState } from "react";
import { fetchCourses, deleteCourse } from "../../api/courseApi";
import "./CourseList.css";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const data = await fetchCourses();
    setCourses(data);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
      loadCourses();
    }
  }

  return (
    <div className="course-list-container">
      <h2>Course List</h2>

      {courses.length === 0 ? (
        <p className="no-data">No courses available</p>
      ) : (
        <div className="table-wrapper">
          <table className="course-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Credits</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.courseId}>
                  <td>{course.courseId}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.credits}</td>
                  <td>{course.departmentName}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(course.courseId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CourseList;
