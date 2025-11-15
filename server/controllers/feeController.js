import pool from "../db.js";

//  Get all fees
export async function getFees(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT f.*, s.firstName, s.lastName 
      FROM fee f
      LEFT JOIN student s ON f.studentId = s.studentId
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching fees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Add new fee
export async function addFee(req, res) {
  const { studentId, amount, dueDate, status } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO fee (studentId, amount, dueDate, status)
       VALUES (?, ?, ?, ?)`,
      [studentId, amount, dueDate, status]
    );
    res.json({ message: "Fee record added successfully", feeId: result.insertId });
  } catch (error) {
    console.error("Error adding fee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Update fee
export async function updateFee(req, res) {
  const { id } = req.params;
  const { amount, dueDate, status } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE fee SET amount=?, dueDate=?, status=? WHERE feeId=?`,
      [amount, dueDate, status, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Fee record not found" });
    res.json({ message: "Fee updated successfully" });
  } catch (error) {
    console.error("Error updating fee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Delete fee
export async function deleteFee(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM fee WHERE feeId = ?", [id]);
    res.json({ message: "Fee deleted successfully" });
  } catch (error) {
    console.error("Error deleting fee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
