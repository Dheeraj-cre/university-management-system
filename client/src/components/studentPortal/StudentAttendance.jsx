import React, { useEffect, useState } from "react";
import "./StudentAttendance.css";

function StudentAttendance() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    percentage: 0,
  });

  const studentId = Number(localStorage.getItem("studentId"));

  useEffect(() => {
    if (!studentId) return;

    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/attendance/student/${studentId}`
        );
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setRecords(data);

          //  Calculate summary totals
          const total = data.length;
          const present = data.filter((r) => r.status === "Present").length;
          const absent = data.filter((r) => r.status === "Absent").length;
          const late = data.filter((r) => r.status === "Late").length;
          const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

          setSummary({ total, present, absent, late, percentage });
        } else {
          setRecords([]);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, [studentId]);

  return (
    <div className="student-attendance-container" style={{ padding: "20px" }}>
      <h2> My Attendance Records</h2>

      {/* === Attendance Summary === */}
      <table
        border="1"
        cellPadding="8"
        style={{
          width: "80%",
          margin: "20px auto",
          textAlign: "center",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ backgroundColor: "#f5f5f5" }}>
          <tr>
            <th>Total Classes</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Late</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{summary.total}</td>
            <td >
              {summary.present}
            </td>
            <td >
              {summary.absent}
            </td>
            <td>
              {summary.late}
            </td>
            <td style={{ fontWeight: "bold" }}>{summary.percentage}%</td>
          </tr>
        </tbody>
      </table>

      {/* === Detailed Attendance Table === */}
      {records.length === 0 ? (
        <p style={{ textAlign: "center" }}>No attendance records found.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th>Date</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.attendanceId}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.courseName}</td>
                <td>
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentAttendance;
