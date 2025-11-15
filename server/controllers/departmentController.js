import pool from "../db.js";

// Get all departments
export async function getDepartments(req, res) {

    // Basic validation
  try {
    const [rows] = await pool.query("SELECT * FROM Department");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Add new department
export async function addDepartment(req, res) {
  const { departmentName, headOfDepartment, location } = req.body;

  // Basic validation
  try {
    const [result] = await pool.query(
      "INSERT INTO Department (departmentName, headOfDepartment, location) VALUES (?, ?, ?)",
      [departmentName, headOfDepartment, location]
    );
    res.json({ message: "Department added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error adding department:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update department
export async function updateDepartment(req, res) {
  const { id } = req.params;
  const { departmentName, headOfDepartment, location } = req.body;

  // Basic validation

  try {
    const [result] = await pool.query(
      "UPDATE Department SET departmentName=?, headOfDepartment=?, location=? WHERE departmentId=?",
      [departmentName, headOfDepartment, location, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department updated successfully" });
  } catch (err) {
    console.error("Error updating department:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete department
export async function deleteDepartment(req, res) {
  const { id } = req.params;

  // Basic validation
  try {
    const [result] = await pool.query("DELETE FROM Department WHERE departmentId=?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json({ message: "Department deleted successfully" });
  } catch (err) {
    console.error("Error deleting department:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
