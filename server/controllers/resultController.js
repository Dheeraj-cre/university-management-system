import pool from "../db.js";

//  Get all results
export async function getResults(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT r.*, s.firstName, s.lastName 
      FROM result r
      LEFT JOIN student s ON r.studentId = s.studentId
      ORDER BY r.year DESC, r.semester ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Add new result
export async function addResult(req, res) {
  const { studentId, semester, year, gpa, status } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO result (studentId, semester, year, gpa, status)
       VALUES (?, ?, ?, ?, ?)`,
      [studentId, semester, year, gpa, status]
    );
    res.json({
      message: "Result added successfully",
      resultId: result.insertId
    });
  } catch (error) {
    console.error("Error adding result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Delete result
export async function deleteResult(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM result WHERE resultId = ?", [id]);
    res.json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Error deleting result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
