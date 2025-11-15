import express from "express";
import { getGrades, addGrade, deleteGrade } from "../controllers/gradeController.js";


// Create a router for grade-related routes
const router = express.Router();

router.get("/", getGrades);
router.post("/", addGrade);
router.delete("/:id", deleteGrade);

export default router;
