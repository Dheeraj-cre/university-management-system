import db from "../db.js";

export const assignFaculty = (req, res) => {
  const { courseId, facultyId } = req.body;
  db.query(
    "INSERT INTO faculty_assignments (course_id, faculty_id) VALUES (?, ?)",
    [courseId, facultyId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", err });
      res.json({ message: "Faculty assigned successfully", result });
    }
  );
};

export const getAssignments = (req, res) => {
  db.query(
    `SELECT fa.id, f.name AS faculty_name, c.name AS course_name 
     FROM faculty_assignments fa
     JOIN faculty f ON fa.faculty_id = f.id
     JOIN courses c ON fa.course_id = c.id`,
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json(results);
    }
  );
};
