import React, { useEffect, useState } from "react";
import AddPayment from "./AddPayment";
import "./PaymentList.css";

function PaymentList() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payments");
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const deletePayment = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/payments/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete payment");
        fetchPayments();
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Management</h2>
      <AddPayment onPaymentAdded={fetchPayments} />

      <table className="payment-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Fee ID</th>
            <th>Payment Date</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((p) => (
              <tr key={p.paymentId}>
                <td>{p.paymentId}</td>
                <td>{p.feeId}</td>
                <td>{p.paymentDate}</td>
                <td>{p.amount}</td>
                <td>{p.paymentMethod}</td>
                <td>{p.status}</td>
                <td>
                  <button onClick={() => deletePayment(p.paymentId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                No payments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentList;
