import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../db.js";

const router = express.Router();

/*  Faculty Signup */
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO faculty (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );

    res.json({ message: "Faculty registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/*  Faculty Login */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM faculty WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const faculty = rows[0];
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { facultyId: faculty.facultyId, email: faculty.email },
      process.env.JWT_SECRET || "facultySecretKey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      faculty: {
        facultyId: faculty.facultyId,
        firstName: faculty.firstName,
        email: faculty.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
