// controllers/enrollmentController.js
import db from "../db.js";

/* ================================
   1️ Enroll Student in Course
================================ */
export const enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ message: "Student ID and Course ID required" });
  }

  try {
    //  Prevent duplicate enrollment
    const [existing] = await db.query(
      "SELECT * FROM enrollments WHERE studentId = ? AND courseId = ?",
      [studentId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const [result] = await db.query(
      "INSERT INTO enrollments (studentId, courseId) VALUES (?, ?)",
      [studentId, courseId]
    );
    res.status(201).json({ message: "Enrollment successful!", id: result.insertId });
  } catch (error) {
    console.error(" Error creating enrollment:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

/* ================================
   2️ Get All Courses
================================ */
export const getCourses = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT courseId, courseName, courseCode FROM course");
    res.json(rows);
  } catch (error) {
    console.error(" Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   3️ Get Enrollments for a Student
================================ */
export const getStudentEnrollments = async (req, res) => {
  const { studentId } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT e.id AS enrollmentId, c.courseId, c.courseName, c.courseCode
       FROM enrollments e
       JOIN course c ON e.courseId = c.courseId
       WHERE e.studentId = ?`,
      [studentId]
    );
    res.json(rows);
  } catch (error) {
    console.error(" Error fetching student enrollments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   4️ Delete Enrollment
================================ */
export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM enrollments WHERE id = ?", [id]);
    res.json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error(" Error deleting enrollment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
