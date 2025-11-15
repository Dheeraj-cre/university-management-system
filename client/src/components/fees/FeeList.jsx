import React, { useEffect, useState } from "react";
import AddFee from "./AddFee";
import "./FeeList.css"; // Import CSS

function FeeList() {
  const [fees, setFees] = useState([]);

  const fetchFees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/fees");
      if (!res.ok) throw new Error("Failed to fetch fees");
      const data = await res.json();
      setFees(data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const deleteFee = async (id) => {
    if (window.confirm("Are you sure to delete this fee record?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/fees/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete fee");
        fetchFees();
      } catch (error) {
        console.error("Error deleting fee:", error);
      }
    }
  };

  return (
    <div className="fee-list-container">
      <h2>Fee Management</h2>
      <AddFee onFeeAdded={fetchFees} />
      <table className="fee-table">
        <thead>
          <tr>
            <th>Fee ID</th>
            <th>Student ID</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((f) => (
            <tr key={f.feeId}>
              <td>{f.feeId}</td>
              <td>{f.studentId}</td>
              <td>₹{f.amount}</td>
              <td>{f.dueDate}</td>
              <td>{f.status}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteFee(f.feeId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {fees.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "#888" }}>
                No fee records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FeeList;
