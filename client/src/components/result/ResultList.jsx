import React, { useEffect, useState } from "react";
import AddResult from "./AddResult";
import "./ResultList.css"; //  import the new CSS

function ResultList() {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/results");
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      await fetch(`http://localhost:5000/api/results/${id}`, { method: "DELETE" });
      fetchResults();
    }
  };

  return (
    <div className="result-list-container">
      <h2 className="result-title">Result Management</h2>
      <AddResult onAdded={fetchResults} />

      <div className="table-container">
        <table className="result-table">
          <thead>
            <tr>
              <th>Result ID</th>
              <th>Student</th>
              <th>Semester</th>
              <th>Year</th>
              <th>GPA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.resultId}>
                <td>{r.resultId}</td>
                <td>{r.firstName} {r.lastName}</td>
                <td>{r.semester}</td>
                <td>{r.year}</td>
                <td>{r.gpa}</td>
                <td>
                  <span className={`status ${r.status === "Pass" ? "pass" : "fail"}`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(r.resultId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultList;
