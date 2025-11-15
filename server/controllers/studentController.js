import  pool  from "../db.js";


// Get all students
export async function getStudents(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT s.*, d.departmentName 
      FROM student s
      LEFT JOIN department d ON s.departmentId = d.departmentId
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// Add new student
export async function addStudent(req, res) {
  const {
    firstName,
    lastName,
    dob,
    gender,
    email,
    phone,
    address,
    enrollmentDate,
    departmentId
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO student (firstName, lastName, dob, gender, email, phone, address, enrollmentDate, departmentId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, dob, gender, email, phone, address, enrollmentDate, departmentId]
    );

    res.json({
      message: "Student added successfully",
      studentId: result.insertId  // <-- MySQL gives this automatically
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// Delete student
export async function deleteStudent(req, res) {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM student WHERE studentId = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update student details
export async function updateStudent(req, res) {
  const { id } = req.params;
  const { firstName, lastName, dob, gender, email, phone, address, enrollmentDate, departmentId } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE student
       SET firstName=?, lastName=?, dob=?, gender=?, email=?, phone=?, address=?, enrollmentDate=?, departmentId=?
       WHERE studentId=?`,
      [firstName, lastName, dob, gender, email, phone, address, enrollmentDate, departmentId, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



