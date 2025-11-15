import express from "express";
import {
  applyAdmission,
  getPendingAdmissions,
  updateAdmissionStatus,
  getAdmissionStatus,
} from "../controllers/admissionController.js";

//  Router Setup

const router = express.Router();

router.post("/apply", applyAdmission);
router.get("/status/:email", getAdmissionStatus);
router.get("/pending", getPendingAdmissions);
router.put("/update/:id", updateAdmissionStatus);

export default router;
