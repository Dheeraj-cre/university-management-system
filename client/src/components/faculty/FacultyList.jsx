import React, { useEffect, useState } from "react";
import { fetchFaculty, deleteFaculty } from "../../api/facultyApi"; // ✅ fixed path
import UpdateFaculty from "./UpdateFaculty";
import "./FacultyList.css"; 

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFaculty();
  }, []);

  async function loadFaculty() {
    try {
      const data = await fetchFaculty();
      setFaculty(data);
      setError("");
    } catch (err) {
      setError("Failed to load faculty list");
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this faculty?")) {
      try {
        await deleteFaculty(id);
        loadFaculty();
      } catch (err) {
        alert("Error deleting faculty");
        console.error(err);
      }
    }
  }

  return (
    <div className="faculty-container">
  <h2>Faculty List</h2>
  {error && <p className="error-message">{error}</p>}
  {faculty.length === 0 ? (
    <p>No faculty found</p>
  ) : (
    <table className="faculty-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {faculty.map((f) => (
          <tr key={f.facultyId}>
            <td>{f.facultyId}</td>
            <td>
              {f.firstName} {f.lastName}
            </td>
            <td>{f.email}</td>
            <td>{f.phone}</td>
            <td>{f.role}</td>
            <td className="faculty-actions">
              <button onClick={() => setEditing(f)}>Edit</button>
              <button onClick={() => handleDelete(f.facultyId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {editing && (
    <UpdateFaculty
      faculty={editing}
      onUpdated={() => {
        setEditing(null);
        loadFaculty();
      }}
    />
  )}
</div>

  );
}

export default FacultyList;
