import pool from "../db.js";

//  Get all attendance records
export async function getAttendance(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, s.firstName, s.lastName, c.courseName
      FROM attendance a
      LEFT JOIN student s ON a.studentId = s.studentId
      LEFT JOIN course c ON a.courseId = c.courseId
      ORDER BY a.date DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Add new attendance
export async function addAttendance(req, res) {
  const { studentId, courseId, date, status } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO attendance (studentId, courseId, date, status)
       VALUES (?, ?, ?, ?)`,
      [studentId, courseId, date, status]
    );

    res.json({
      message: "Attendance record added successfully",
      attendanceId: result.insertId
    });
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Delete attendance
export async function deleteAttendance(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM attendance WHERE attendanceId = ?", [id]);
    res.json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
