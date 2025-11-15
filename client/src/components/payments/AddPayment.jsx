import React, { useState } from "react";
import "./AddPayment.css";

function AddPayment({ onPaymentAdded }) {
  const [form, setForm] = useState({
    feeId: "",
    paymentDate: "",
    amount: "",
    paymentMethod: "Cash",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add payment");
      alert("Payment added successfully!");
      setForm({
        feeId: "",
        paymentDate: "",
        amount: "",
        paymentMethod: "Cash",
        status: "Pending",
      });
      onPaymentAdded();
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Error adding payment");
    }
  };

  return (
    <div className="add-payment-container">
      <h3>Add Payment</h3>
      <form onSubmit={handleSubmit} className="add-payment-form">
        <input
          name="feeId"
          placeholder="Fee ID"
          value={form.feeId}
          onChange={handleChange}
        />
        <input
          type="date"
          name="paymentDate"
          value={form.paymentDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
        <button type="submit">Add Payment</button>
      </form>
    </div>
  );
}

export default AddPayment;
