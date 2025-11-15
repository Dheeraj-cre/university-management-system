import express from "express";
import { getAttendance, addAttendance, deleteAttendance } from "../controllers/attendanceController.js";
import db from "../db.js";
const router = express.Router();

// Fetch attendance for a specific student
router.get("/student/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
       const [rows] = await db.query(
      `SELECT 
         a.attendanceId, 
         c.courseName, 
         a.date, 
         a.status 
       FROM attendance a
       JOIN course c ON a.courseId = c.courseId
       WHERE a.studentId = ?`,
      [studentId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching student attendance:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Attendance routes
router.get("/", getAttendance);
router.post("/", addAttendance);
router.delete("/:id", deleteAttendance);



export default router;
