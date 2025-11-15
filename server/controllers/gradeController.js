import pool from "../db.js";

// Get all grades
export async function getGrades(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT g.*, s.firstName, s.lastName, c.courseName
      FROM grade g
      LEFT JOIN student s ON g.studentId = s.studentId
      LEFT JOIN course c ON g.courseId = c.courseId
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Add new grade
export async function addGrade(req, res) {
  const { studentId, courseId, semester, year, grade } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO grade (studentId, courseId, semester, year, grade)
       VALUES (?, ?, ?, ?, ?)`,
      [studentId, courseId, semester, year, grade]
    );
    res.json({ message: "Grade added successfully", gradeId: result.insertId });
  } catch (error) {
    console.error("Error adding grade:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete grade
export async function deleteGrade(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM grade WHERE gradeId = ?", [id]);
    res.json({ message: "Grade deleted successfully" });
  } catch (error) {
    console.error("Error deleting grade:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
