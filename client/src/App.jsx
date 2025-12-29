// === Importing Core Dependencies ===
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

// === Layout Components (Navbar + Sidebar) ===
import Navbar from "./components/Navbar";
import Sidebar from "./components/layout/Sidebar";

// === Core Pages (Public) ===
import Home from "./components/Home";
import About from "./components/About";
import Dashboard from "./components/dashboard/Dashboard";

// === Admin Modules (Protected Dashboard Pages) ===
import DepartmentPage from "./components/dashboard/departments/DepartmentPage";
import StudentPage from "./components/dashboard/students/StudentPage";
import CoursePage from "./components/courses/CoursePage";
import FacultyPage from "./components/faculty/FacultyPage";
import FeeList from "./components/fees/FeeList";
import PaymentList from "./components/payments/PaymentList";
import ExamList from "./components/exams/ExamList";
import GradeList from "./components/grades/GradeList";
import AttendanceList from "./components/attendance/AttendanceList";
import ResultList from "./components/result/ResultList";
import EnrollmentPage from "./components/enrollment/EnrollmentPage";
import FacultyAssignment from "./components/faculty/FacultyAssignment";

// === Admission Related Pages ===
import AdmissionForm from "./components/studentPortal/AdmissionForm";
import AdminAdmissionList from "./components/admission/AdminAdmissionList";
import CheckAdmissionStatus from "./components/admission/CheckAdmissionStatus";

// === Login & Authentication Pages ===
import StudentLogin from "./components/login/StudentLogin";
import FacultyLogin from "./components/login/FacultyLogin";
import AdminLogin from "./components/login/AdminLogin";
import StudentSignup from "./components/login/StudentSignup";

// === Student Portal Pages (Protected) ===
import StudentPortal from "./components/studentPortal/StudentPortal";
import StudentAttendance from "./components/studentPortal/StudentAttendance";
import StudentEnrollment from "./components/studentPortal/StudentEnrollment";

// === Faculty Portal Pages (Protected) ===
import FacultyPortal from "./components/facultyPortal/FacultyPortal";
import FacultySignup from "./components/login/FacultySignup";

// === Auth Route Guards ===
import ProtectedRoute from "./components/auth/ProtectedRoute";
import StudentProtectedRoute from "./components/auth/StudentProtectedRoute";

/**
 * Layout Component:
 * - Contains Navbar, Sidebar, and the Main Routing Area.
 * - Controls visibility of Sidebar based on the current route.
 */
function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // List of paths where the sidebar should be hidden (Public/Student pages)
  const hideSidebarPaths = [
    "/", "/about",
    "/admission/apply", "/admission/admin", "/admission/status",
    "/login/student", "/login/faculty",
    "/login/student-signup",
    "/student/portal", "/student/attendance", "/student/enrollment",
  ];

  // Show sidebar only when the current route is not in the hidden list
  const showSidebar = !hideSidebarPaths.includes(location.pathname.toLowerCase());

  return (
    <>
    
      {/* Navbar always visible, toggle controls Sidebar open/close */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> 

      <div className="app-layout">
        {/* Conditional Sidebar Rendering */}
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main Content Area where routes are rendered */}
        <main className="main-content">
          <Routes>
            {/* === Public Routes === */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* === Admin Protected Routes (Dashboard) === */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/departments"
              element={
                <ProtectedRoute>
                  <DepartmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <StudentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CoursePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty"
              element={
                <ProtectedRoute>
                  <FacultyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fees"
              element={
                <ProtectedRoute>
                  <FeeList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <PaymentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/exams"
              element={
                <ProtectedRoute>
                  <ExamList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grades"
              element={
                <ProtectedRoute>
                  <GradeList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <AttendanceList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <ResultList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/enrollments"
              element={
                <ProtectedRoute>
                  <EnrollmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/assign"
              element={
                <ProtectedRoute>
                  <FacultyAssignment />
                </ProtectedRoute>
              }
            />

            {/* === Admission Routes (Public) === */}
            <Route path="/admission/apply" element={<AdmissionForm />} />
            <Route path="/admission/admin" element={<AdminAdmissionList />} />
            <Route path="/admission/status" element={<CheckAdmissionStatus />} />

            {/* === Login & Signup Routes === */}
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/student-signup" element={<StudentSignup />} />
            <Route path="/login/faculty" element={<FacultyLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />

            {/* === Student Portal (Protected for Students) === */}
            <Route path="/student/portal" element={<StudentPortal />} />
            <Route
              path="/student/attendance"
              element={
                <StudentProtectedRoute>
                  <StudentAttendance />
                </StudentProtectedRoute>
              }
            />
            <Route
              path="/student/enrollment"
              element={
                <StudentProtectedRoute>
                  <StudentEnrollment />
                </StudentProtectedRoute>
              }
            />

            {/* === Faculty Portal (Protected for Faculty) === */}
            <Route
              path="/faculty/portal"
              element={
                  <FacultyPortal />
              }
            />
            <Route path ="login/faculty-signup" element={<FacultySignup />} />
          </Routes>
          


        </main>
      </div>
    </>
  );
}

/**
 * App Component:
 * - Root Component wrapped with BrowserRouter.
 * - Renders the Layout component which contains all routes.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
