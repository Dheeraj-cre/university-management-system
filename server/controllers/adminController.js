import pool from "../db.js";


// Admin Login
export async function adminLogin(req, res) {
  const { email, password } = req.body;

// Validate input
  try {
    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Admin not found" });

    const admin = rows[0];
    if (admin.password !== password)
      return res.status(401).json({ error: "Invalid password" });

    res.json({ message: "Login successful", admin });
  } 
  
  // Handle errors
  catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
