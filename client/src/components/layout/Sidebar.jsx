import React from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  BookOpen,
  UserCheck,
  DollarSign,
  CreditCard,
  ClipboardList,
  Award,
  CalendarCheck,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import "./layout.css";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { path: "/departments", label: "Departments", icon: <BookOpen size={18} /> },
  { path: "/students", label: "Students", icon: <Users size={18} /> },
  { path: "/courses", label: "Courses", icon: <BookOpen size={18} /> },
  { path: "/faculty", label: "Faculty", icon: <UserCheck size={18} /> },
  { path: "/fees", label: "Fees", icon: <DollarSign size={18} /> },
  { path: "/payments", label: "Payments", icon: <CreditCard size={18} /> },
  { path: "/exams", label: "Exams", icon: <ClipboardList size={18} /> },
  { path: "/grades", label: "Grades", icon: <Award size={18} /> },
  { path: "/attendance", label: "Attendance", icon: <CalendarCheck size={18} /> },
  { path: "/results", label: "Results", icon: <FileText size={18} /> },
  { path: "admission/admin", label: "Admission Request", icon: <FileText size={18} /> },
  { path: "/faculty/assign", label: "Faculty Assign", icon: <FileText size ={18} />}

];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h2> Admin Panel</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active nav-item" : "nav-item"
              }
              onClick={onClose}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
