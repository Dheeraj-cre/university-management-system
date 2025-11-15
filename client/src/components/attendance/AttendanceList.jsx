import React, { useEffect, useState } from "react";
import AddAttendance from "./AddAttendance";
// import "./AttendanceList.css";

function AttendanceList() {
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/attendance");
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await fetch(`http://localhost:5000/api/attendance/${id}`, { method: "DELETE" });
      fetchAttendance();
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Management</h2>
      <AddAttendance onAdded={fetchAttendance} />

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Attendance ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.attendanceId}>
                  <td>{r.attendanceId}</td>
                  <td>{r.firstName} {r.lastName}</td>
                  <td>{r.courseName}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        r.status === "Present"
                          ? "present"
                          : r.status === "Absent"
                          ? "absent"
                          : "late"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(r.attendanceId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceList;
