// routes/enrollmentRoutes.js
import express from "express";
import {
  enrollStudent,
  getCourses,
  getStudentEnrollments,
  deleteEnrollment
} from "../controllers/enrollmentController.js";

const router = express.Router();

// === Routes ===
router.post("/", enrollStudent);
router.get("/courses", getCourses);
router.get("/student/:studentId", getStudentEnrollments);
router.delete("/:id", deleteEnrollment);

export default router;
