import pool from "../db.js";

// Get all exams
export async function getExams(req, res) {

  // Join with course to get course names
  try {
    const [rows] = await pool.query(`
      SELECT e.*, c.courseName 
      FROM exam e
      LEFT JOIN course c ON e.courseId = c.courseId
    `);
    res.json(rows);
  } 
   
  // handle errors
  catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Add new exam
export async function addExam(req, res) {
  const { courseId, examDate, duration, type } = req.body;

  // Insert into database
  try {
    const [result] = await pool.query(
      `INSERT INTO exam (courseId, examDate, duration, type)
       VALUES (?, ?, ?, ?)`,
      [courseId, examDate, duration, type]
    );
    res.json({ message: "Exam added successfully", examId: result.insertId });
  } 
  
  // handle errors
  catch (error) {
    console.error("Error adding exam:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete exam
export async function deleteExam(req, res) {
  const { id } = req.params;

  // Delete from database
  try {
    await pool.query("DELETE FROM exam WHERE examId = ?", [id]);
    res.json({ message: "Exam deleted successfully" });
  } 
  // handle errors
  catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
