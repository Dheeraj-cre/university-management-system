import React, { useState } from "react";
import "./AddFee.css";

function AddFee({ onFeeAdded }) {
  const [form, setForm] = useState({
    studentId: "",
    amount: "",
    dueDate: "",
    status: "Unpaid",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to add fee");

      alert(" Fee record added successfully!");
      setForm({ studentId: "", amount: "", dueDate: "", status: "Unpaid" });
      onFeeAdded(); // refresh list
    } catch (error) {
      console.error("Error adding fee:", error);
      alert(" Error adding fee");
    }
  };

  return (
    <div className="add-fee-container">
      <h2>Add Fee Record</h2>
      <form onSubmit={handleSubmit} className="add-fee-form">
        <div className="form-row">
          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            placeholder="Enter Student ID"
            value={form.studentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Status:</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Add Fee
        </button>
      </form>
    </div>
  );
}

export default AddFee;
