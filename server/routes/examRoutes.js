import express from "express";
import { getExams, addExam, deleteExam } from "../controllers/examController.js";

const router = express.Router();

router.get("/", getExams);
router.post("/", addExam);
router.delete("/:id", deleteExam);

export default router;
