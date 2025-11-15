import express from "express";
import { getDepartmentReport, getFeeReport } from "../controllers/reportController.js";

// Create a router for report-related routes
const router = express.Router();

router.get("/department", getDepartmentReport);
router.get("/fees", getFeeReport);

export default router;
