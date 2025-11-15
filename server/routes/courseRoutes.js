import express from "express";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

// Create a router for course-related routes

const router = express.Router();

router.get("/", getCourses);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
