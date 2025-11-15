import express from "express";
import { getResults, addResult, deleteResult } from "../controllers/resultController.js";


// Create a router for result-related routes
const router = express.Router();

router.get("/", getResults);
router.post("/", addResult);
router.delete("/:id", deleteResult);

export default router;
