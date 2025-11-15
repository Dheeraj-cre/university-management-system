import React, { useEffect, useState } from "react";
import AddExam from "./AddExam";
import "./ExamList.css";

function ExamList() {
  const [exams, setExams] = useState([]);

  const fetchExams = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/exams");
      const data = await res.json();
      setExams(data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await fetch(`http://localhost:5000/api/exams/${id}`, { method: "DELETE" });
        fetchExams();
      } catch (error) {
        console.error("Error deleting exam:", error);
      }
    }
  };

  return (
    <div className="exam-container">
      <h2>Exam Management</h2>
      <AddExam onExamAdded={fetchExams} />
      <table className="exam-table">
        <thead>
          <tr>
            <th>Exam ID</th>
            <th>Course</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.length > 0 ? (
            exams.map((exam) => (
              <tr key={exam.examId}>
                <td>{exam.examId}</td>
                <td>{exam.courseName}</td>
                <td>{exam.examDate}</td>
                <td>{exam.duration} mins</td>
                <td>{exam.type}</td>
                <td>
                  <button onClick={() => handleDelete(exam.examId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                No exams available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExamList;
