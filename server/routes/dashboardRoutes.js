import express from "express";
import pool from "../db.js";


// Create a router for dashboard-related routes
const router = express.Router();

// Route to get dashboard statistics
router.get("/", async (req, res) => {
  try {
    const [[studentCount]] = await pool.query("SELECT COUNT(*) AS students FROM student");
    const [[courseCount]] = await pool.query("SELECT COUNT(*) AS courses FROM course");
    const [[facultyCount]] = await pool.query("SELECT COUNT(*) AS faculty FROM faculty");
    const [[feeSum]] = await pool.query("SELECT SUM(amount) AS fees FROM fee");
    const [[paymentSum]] = await pool.query("SELECT SUM(amount) AS payments FROM payment");

    res.json({
      students: studentCount.students,
      courses: courseCount.courses,
      faculty: facultyCount.faculty,
      fees: feeSum.fees || 0,
      payments: paymentSum.payments || 0,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
