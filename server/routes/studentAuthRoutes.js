import express from "express";
import jwt from "jsonwebtoken";
import db from "../db.js";
import bcrypt from "bcryptjs";

const router = express.Router();

//  Student Signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO student (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );

    res.json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//  Student Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM student WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const student = rows[0];

    //  Compare hashed passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //  Generate JWT token
    const token = jwt.sign(
      { studentId: student.studentId, email: student.email },
      process.env.JWT_SECRET || "studentSecretKey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        studentId: student.studentId,
        firstName: student.firstName,
        email: student.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
