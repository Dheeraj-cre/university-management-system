import pool from "../db.js";

//  Get all payments
export async function getPayments(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, f.amount AS feeAmount, f.status AS feeStatus, s.firstName, s.lastName
      FROM payment p
      LEFT JOIN fee f ON p.feeId = f.feeId
      LEFT JOIN student s ON f.studentId = s.studentId
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Add new payment
export async function addPayment(req, res) {
  const { feeId, paymentDate, amount, paymentMethod, status } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO payment (feeId, paymentDate, amount, paymentMethod, status)
       VALUES (?, ?, ?, ?, ?)`,
      [feeId, paymentDate, amount, paymentMethod, status]
    );
    res.json({ message: "Payment recorded successfully", paymentId: result.insertId });
  } catch (error) {
    console.error("Error adding payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Update payment
export async function updatePayment(req, res) {
  const { id } = req.params;
  const { paymentDate, amount, paymentMethod, status } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE payment SET paymentDate=?, amount=?, paymentMethod=?, status=? WHERE paymentId=?`,
      [paymentDate, amount, paymentMethod, status, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Payment not found" });

    res.json({ message: "Payment updated successfully" });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Delete payment
export async function deletePayment(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM payment WHERE paymentId = ?", [id]);
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
