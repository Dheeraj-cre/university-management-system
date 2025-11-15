import express from "express";
import cors from "cors";
import departmentRoutes from "./routes/departmentRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import facultyAssignmentRoutes from "./routes/facultyAssignmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import studentAuthRoutes from "./routes/studentAuthRoutes.js";
import facultyAuthRoutes from "./routes/facultyAuthRoutes.js";


// Initialize Express app

const app = express();

// use middlewares
app.use(cors());

// to parse JSON bodies
app.use(express.json());

// use routes
app.use("/api/departments", departmentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/faculty-assignment", facultyAssignmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/student/auth", studentAuthRoutes);
app.use("/api/faculty/auth", facultyAuthRoutes);



// start server
app.listen(5000, () => console.log("Server running on port 5000"));
