import React, { useState } from "react";
import AddDepartment from "./AddDepartment";
import DepartmentList from "./DepartmentList";

function DepartmentsPage() {
  // state to trigger re-render of DepartmentList
  const [refresh, setRefresh] = useState(0);

  // callback passed to AddDepartment
  const handleDepartmentAdded = () => {
    // increment refresh value to force re-render
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="page-container">
      <h2>Department Management</h2>

      {/* Pass callback to AddDepartment */}
      <AddDepartment onAdded={handleDepartmentAdded} />

      {/* Key forces list re-render when refresh changes */}
      <DepartmentList key={refresh} />
    </div>
  );
}

export default DepartmentsPage;
