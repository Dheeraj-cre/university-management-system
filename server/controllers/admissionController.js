import pool from "../db.js";

//  Apply for admission
export async function applyAdmission(req, res) {
  const { firstName, lastName, dob, gender, email, phone, address, program } = req.body;

  try {
    // Check if the email already exists
    const [existing] = await pool.query(`SELECT * FROM admission WHERE email = ?`, [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "An application with this email already exists." });
    }

    // Insert new application
    await pool.query(
      `INSERT INTO admission 
        (firstName, lastName, dob, gender, email, phone, address, program, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
      [firstName, lastName, dob, gender, email, phone, address, program]
    );

    res.json({ message: "Application submitted successfully. Await approval." });
  } catch (error) {
    console.error(" Error submitting application:", error);
    res.status(500).json({ error: error.message });
  }
}

//  Get admission status by email
export async function getAdmissionStatus(req, res) {
  const { email } = req.params;

  try {
    const [rows] = await pool.query(`SELECT * FROM admission WHERE email = ?`, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No application found for this email." });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(" Error fetching admission status:", error);
    res.status(500).json({ error: error.message });
  }
}

//  Get all pending applications (for admin)
export async function getPendingAdmissions(req, res) {
  try {
    const [rows] = await pool.query(`SELECT * FROM admission WHERE status = 'Pending'`);
    res.json(rows);
  } catch (error) {
    console.error(" Error fetching pending applications:", error);
    res.status(500).json({ error: error.message });
  }
}

//  Approve or reject an admission
export async function updateAdmissionStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Update status in admission table
    await pool.query(`UPDATE admission SET status = ? WHERE admissionId = ?`, [status, id]);

    if (status === "Approved") {
      const [rows] = await pool.query(`SELECT * FROM admission WHERE admissionId = ?`, [id]);
      const student = rows[0];

      // Auto-insert into student table
      await pool.query(
        `INSERT INTO student (firstName, lastName, dob, gender, email, phone, address, enrollmentDate, departmentId)
         VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), NULL)`,
        [
          student.firstName,
          student.lastName,
          student.dob,
          student.gender,
          student.email,
          student.phone,
          student.address,
        ]
      );
    }

    res.json({ message: `Admission ${status} successfully.` });
  } catch (error) {
    console.error(" Error updating admission status:", error);
    res.status(500).json({ error: error.message });
  }
}
