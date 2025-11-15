import pool from "../db.js";

// Student Count per Department
export async function getDepartmentReport(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT d.departmentName, COUNT(s.studentId) AS studentCount
      FROM department d
      LEFT JOIN student s ON d.departmentId = s.departmentId
      GROUP BY d.departmentName
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Fee Collection Summary
export async function getFeeReport(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT status, SUM(amount) AS totalAmount
      FROM fee
      GROUP BY status
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
