import pool from "../db.js";

//  Get all courses
export async function getCourses(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, d.departmentName
      FROM course c
      LEFT JOIN department d ON c.departmentId = d.departmentId
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Add new course
export async function addCourse(req, res) {
  const { courseName, courseCode, credits, departmentId } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO course (courseName, courseCode, credits, departmentId)
       VALUES (?, ?, ?, ?)`,
      [courseName, courseCode, credits, departmentId]
    );

    res.json({ message: "Course added successfully", courseId: result.insertId });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Update course
export async function updateCourse(req, res) {
  const { id } = req.params;
  const { courseName, courseCode, credits, departmentId } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE course 
       SET courseName = ?, courseCode = ?, credits = ?, departmentId = ?
       WHERE courseId = ?`,
      [courseName, courseCode, credits, departmentId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//  Delete course
export async function deleteCourse(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM course WHERE courseId = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
