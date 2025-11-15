import pool from "../db.js";

// Get all faculty
export async function getFaculty(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT f.*, d.departmentName
      FROM faculty f
      LEFT JOIN department d ON f.departmentId = d.departmentId
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching faculty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Add faculty
export async function addFaculty(req, res) {
  const { firstName, lastName, email, phone, address, departmentId, hireDate, role } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO faculty (firstName, lastName, email, phone, address, departmentId, hireDate, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phone, address, departmentId, hireDate, role]
    );
    res.json({ message: "Faculty added successfully", facultyId: result.insertId });
  } catch (error) {
    console.error("Error adding faculty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete faculty
export async function deleteFaculty(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM faculty WHERE facultyId = ?", [id]);
    res.json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Update faculty details
export async function updateFaculty(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email, phone, address, departmentId, hireDate, role } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE faculty 
       SET firstName=?, lastName=?, email=?, phone=?, address=?, departmentId=?, hireDate=?, role=?
       WHERE facultyId=?`,
      [firstName, lastName, email, phone, address, departmentId, hireDate, role, id]
    );

    // If no rows were affected, the faculty ID does not exist

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({ message: "Faculty updated successfully" });
  } catch (error) {
    console.error("Error updating faculty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Get Faculty Profile by ID
export async function getFacultyProfile(req, res) {
  const { facultyId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT facultyId, firstName, lastName, email, phone, address, role, hireDate
       FROM faculty
       WHERE facultyId = ?`,
      [facultyId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Get Courses Assigned to Faculty
export async function getFacultyCourses(req, res) {
  const { facultyId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT 
         c.courseId, c.courseName, c.courseCode, d.departmentName
       FROM faculty_assignment fa
       JOIN course c ON fa.courseId = c.courseId
       JOIN department d ON c.departmentId = d.departmentId
       WHERE fa.facultyId = ?`,
      [facultyId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching faculty courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
