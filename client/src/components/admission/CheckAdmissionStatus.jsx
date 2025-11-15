import React, { useState } from "react";
import "./CheckAdmissionStatus.css";


// Component to check admission status by email
function CheckAdmissionStatus() {

  // State variables
  const [email, setEmail] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setError("");
    setStatusData(null);
   

    // Fetch admission status from backend API
    try {
      const res = await fetch(`http://localhost:5000/api/admissions/status/${email}`);
      if (!res.ok) {
        const msg = await res.json();
        throw new Error(msg.message || "Something went wrong");
      }
      const data = await res.json();
      setStatusData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (

    // ui for checking admission status
    <div className="status-container">
      <h2> Check Admission Status</h2>
      <form onSubmit={handleCheckStatus} className="status-form">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Check Status</button>
      </form>

      {error && <p className="error">{error}</p>}

      {statusData && (
        <div className="status-result">
          <h3>Hello, {statusData.fullName} </h3>
          <p>Course Applied: <b>{statusData.course}</b></p>
          <p>
            Admission Status:{" "}
            <b
              className={
                statusData.status === "Approved"
                  ? "approved"
                  : statusData.status === "Rejected"
                  ? "rejected"
                  : "pending"
              }
            >
              {statusData.status}
            </b>
          </p>
        </div>
      )}
    </div>
  );
}

export default CheckAdmissionStatus;
