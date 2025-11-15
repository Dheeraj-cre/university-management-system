import React, { useEffect, useState } from "react";
import { fetchStudents, deleteStudent } from "../../../api/studentApi";
import UpdateStudent from "./UpdateStudent";
import "./StudentList.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const data = await fetchStudents();
    setStudents(data);
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this student?")) {
      await deleteStudent(id);
      loadStudents();
    }
  }

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.studentId}>
                  <td>{s.studentId}</td>
                  <td>{s.firstName} {s.lastName}</td>
                  <td>{s.email}</td>
                  <td>{s.dob}</td>
                  <td>{s.gender}</td>
                  <td>{s.departmentName}</td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => setEditing(s)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(s.studentId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <UpdateStudent
          student={editing}
          onUpdated={() => {
            setEditing(null);
            loadStudents();
          }}
        />
      )}
    </div>
  );
}

export default StudentList;
