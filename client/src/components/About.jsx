import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Our University Management System</h1>
        <p>
          Empowering universities with a digital solution to manage academic and
          administrative operations efficiently.
        </p>
      </header>

      <section className="about-section">
        <h2> Our Mission</h2>
        <p>
          Our mission is to modernize and simplify the management of universities
          by integrating all key operations — from student enrollment to exams,
          results, and administration — into a single, seamless platform.
        </p>
      </section>

      <section className="about-section">
        <h2> Key Features</h2>
        <ul>
          <li>Student Admission & Profile Management</li>
          <li>Course, Faculty & Department Management</li>
          <li>Online Fee Payment & Receipt Generation</li>
          <li>Exam Scheduling, Grading & Result Tracking</li>
          <li>Attendance Monitoring & Report Generation</li>
          <li>Library & Event Management Modules</li>
          <li>Interactive Dashboard with Analytics & Charts</li>
        </ul>
      </section>

      <section className="about-section">
        <h2> Vision</h2>
        <p>
          To transform education management through digital innovation — ensuring
          transparency, accessibility, and efficiency in every aspect of
          university operations.
        </p>
      </section>

      <footer className="about-footer">
        <p>© {new Date().getFullYear()} University Management System | Built with ❤️ by Dheeraj Srivastava</p>
      </footer>
    </div>
  );
}

export default About;
