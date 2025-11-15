import React, { useEffect, useState } from "react";
import "./AdminAdmissionList.css";


//  Component to display and manage pending admission applications for admin users
function AdminAdmissionList() {
  const [admissions, setAdmissions] = useState([]);


  // Fetch pending admissions from the backend API
  const fetchAdmissions = async () => {

    // Make API call to fetch pending admissions
    try {
      const res = await fetch("http://localhost:5000/api/admissions/pending");
      const data = await res.json();
      setAdmissions(data);
    } 
    
    
    // Handle any errors during the fetch operation
    catch (error) {
      console.error("Error fetching admissions:", error);
    }
  };


   // Handle approval or rejection of an admission application
  const handleStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/admissions/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchAdmissions(); // reload list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  //  Fetch admissions when component mounts
  useEffect(() => {
    fetchAdmissions();
  }, []);

  return (

    // Admin Admission List UI
    <div className="admin-admission-container">
      <h2>Pending Admissions</h2>

      {admissions.length === 0 ? (
        <p className="no-data">No pending applications.</p>
      ) : (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>Applied On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((app) => (
                <tr key={app.admissionId}>
                  <td>{app.admissionId}</td>
                  <td>{app.firstName} {app.lastName}</td>
                  <td>{app.email}</td>
                  <td>{app.program}</td>
                  <td>{app.applicationDate}</td>
                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => handleStatus(app.admissionId, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleStatus(app.admissionId, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminAdmissionList;
