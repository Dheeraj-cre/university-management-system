import React, { useEffect, useState } from "react";
import AddGrade from "./AddGrade";
import "./GradeList.css";

function GradeList() {
  const [grades, setGrades] = useState([]);

  const fetchGrades = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/grades");
      const data = await res.json();
      setGrades(data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this grade record?")) {
      try {
        await fetch(`http://localhost:5000/api/grades/${id}`, { method: "DELETE" });
        fetchGrades();
      } catch (error) {
        console.error("Error deleting grade:", error);
      }
    }
  };

  return (
    <div className="grade-container">
      <h2>Grade Management</h2>
      <AddGrade onGradeAdded={fetchGrades} />
      <table className="grade-table">
        <thead>
          <tr>
            <th>Grade ID</th>
            <th>Student</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.length > 0 ? (
            grades.map((g) => (
              <tr key={g.gradeId}>
                <td>{g.gradeId}</td>
                <td>
                  {g.firstName} {g.lastName}
                </td>
                <td>{g.courseName}</td>
                <td>{g.semester}</td>
                <td>{g.year}</td>
                <td>{g.grade}</td>
                <td>
                  <button onClick={() => handleDelete(g.gradeId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                No grades available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GradeList;
