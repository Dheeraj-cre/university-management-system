import express from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js"; //  your MySQL connection pool

const router = express.Router();

// =============================
//  Admin Login Route
// =============================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //  1. Find admin by email
    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    const admin = rows[0];

    //  2. Verify password
    if (password !== admin.password)
      return res.status(401).json({ message: "Invalid password" });

    //  3. Generate JWT Token
    const token = jwt.sign(
      { id: admin.adminId, email: admin.email, role: "admin" },
      process.env.JWT_SECRET || "yourSecretKey",
      { expiresIn: "1h" }
    );

    //  4. Respond with token and admin info
    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.adminId,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
