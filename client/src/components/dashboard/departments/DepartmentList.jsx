import React, { useEffect, useState } from "react";
import { fetchDepartments, deleteDepartment } from "../../../api/departmentApi";
import "./DepartmentList.css";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  const loadDepartments = async () => {
    const data = await fetchDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      await deleteDepartment(id);
      alert("Department deleted!");
      loadDepartments();
    }
  };

  return (
    <div className="department-list-container">
      <h2>Department List</h2>
      {departments.length === 0 ? (
        <p>No departments found</p>
      ) : (
        <table className="department-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Head</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.departmentId}>
                <td data-label="ID">{d.departmentId}</td>
                <td data-label="Name">{d.departmentName}</td>
                <td data-label="Head">{d.headOfDepartment}</td>
                <td data-label="Location">{d.location}</td>
                <td data-label="Action">
                  <button onClick={() => handleDelete(d.departmentId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DepartmentList;
