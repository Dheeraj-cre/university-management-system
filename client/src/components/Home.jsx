import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <h1>Empowering Future Leaders</h1>
          <p className="hero-sub">
            Discover world-class education and innovation at the forefront of knowledge.
          </p>

          <div className="hero-cta">
            <Link to="/programs" className="btn primary">Explore Programs</Link>
            <Link to="/admission/apply" className="btn outline">Apply Now</Link>
          </div>
        </div>
      </section>

      {/* ================= UMS SECTION ================= */}
      <section className="ums-section">
        <div className="ums-container">
          <div className="ums-image">
            <img src="./image/intro-pic.jpg" alt="UMS ERP" />
          </div>

          <div className="ums-content">
            <h2>UMS: an in-house ERP Solution</h2>
            <p>
              UMS (University Management System), the University’s ERP developed in-house,
              is the backbone of its e-governance architecture. It streamlines academic,
              administrative, and support services to ensure transparency and efficiency
              across departments.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LMS SECTION ================= */}
      <section className="lms-section">
        <div className="lms-container">
          <div className="lms-content">
            <h2>LMS: A System to Manage Academic Functions</h2>
            <p>
              The Learning Management System (LMS) is an intelligent, in-house web-based
              platform designed to manage academic activities efficiently. It offers
              access to attendance, assignments, records, and more.
            </p>

            <h3>Major Modules of LMS</h3>
            <ul>
              <li>➤ Assignments / Academic Tasks Management</li>
              <li>➤ Attendance Management</li>
              <li>➤ Timetable</li>
            </ul>
          </div>

          <div className="lms-image">
            <img src="./image/lms.jpg" alt="LMS Illustration" />
          </div>
        </div>
      </section>

      {/* ================= QUICK ACCESS ================= */}
      <section className="quick-access">
        <h2>Quick Access Portals</h2>

        <div className="portal-cards">
          <div className="card">
            <h3>Student Portal</h3>
            <p>Access your courses, attendance, results, and fees.</p>
            <Link to="/login/student" className="btn small">Go to Portal</Link>
          </div>

          <div className="card">
            <h3>Faculty Portal</h3>
            <p>Manage course schedules, grading, and student performance.</p>
            <Link to="/login/faculty" className="btn small">Go to Portal</Link>
          </div>

          <div className="card">
            <h3>Admin Panel</h3>
            <p>Control departments, courses, fees, and overall university data.</p>
            <Link to="/login/admin" className="btn small">Go to Panel</Link>
          </div>
        </div>
      </section>

      {/* ================= ANNOUNCEMENTS ================= */}
      <section className="announcements">
        <h2>Latest Announcements</h2>
        <ul>
          <li>New semester admissions open from <b>1st November</b>.</li>
          <li>Fee payment portal updated with new methods.</li>
          <li>Final exams schedule released for 2025 batch.</li>
        </ul>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-columns">

          <div className="footer-column">
            <h3>Contact</h3>
            <hr />
            <p><strong>University</strong></p>
            <p>
              Senate House Campus, University Road, Old Katra,<br />
              Uttar Pradesh - 211002
            </p>
            <p>0532-2461083</p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <hr />
            <ul>
              <li><a href="#">Directory</a></li>
              <li><a href="#">Academic Calendar</a></li>
              <li><a href="#">Download Forms</a></li>
              <li><a href="#">NEP 2020</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>For Visitors</h3>
            <hr />
            <ul>
              <li><a href="#">Map & Directions</a></li>
              <li><a href="#">Campus Tour</a></li>
              <li><a href="#">Hostel Info</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Follow Us</h3>
            <hr />
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2025 University Management System. All Rights Reserved.</p>
          <p>Visitors: <strong>1058145</strong></p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
