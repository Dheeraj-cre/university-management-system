import express from "express";
import {
  getFaculty,
  addFaculty,
  deleteFaculty,
  updateFaculty,
  getFacultyProfile,
  getFacultyCourses
} from "../controllers/facultyController.js";

const router = express.Router();

// Admin CRUD
router.get("/", getFaculty);
router.post("/", addFaculty);
router.delete("/:id", deleteFaculty);
router.put("/:id", updateFaculty);

// Faculty Portal Endpoints
router.get("/profile/:facultyId", getFacultyProfile);
router.get("/courses/:facultyId", getFacultyCourses);

export default router;
