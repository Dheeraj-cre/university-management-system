import express from "express";
import db from "../db.js";

const router = express.Router();

/* ================================
   1️⃣ Add new faculty-course assignment
================================ */
router.post("/", async (req, res) => {
  const { facultyId, courseId } = req.body;

  if (!facultyId || !courseId) {
    return res.status(400).json({ message: "Faculty ID and Course ID are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO faculty_assignment (facultyId, courseId) VALUES (?, ?)",
      [facultyId, courseId]
    );
    res.status(201).json({ message: "Faculty assigned successfully!", id: result.insertId });
  } catch (err) {
    console.error("❌ Error inserting assignment:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   2️⃣ Get all faculty-course assignments
================================ */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        fa.assignmentId AS id,
        f.firstName AS faculty_name,
        c.courseName AS course_name,
        c.courseCode AS course_code
      FROM faculty_assignment fa
      JOIN faculty f ON fa.facultyId = f.facultyId
      JOIN course c ON fa.courseId = c.courseId
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ SQL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   3️⃣ Delete an assignment
================================ */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM faculty_assignment WHERE assignmentId = ?", [id]);
    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting assignment:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
