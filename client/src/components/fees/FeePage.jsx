import React, { useState } from "react";
import AddFee from "./AddFee";
import FeeList from "./FeeList";


function FeesPage() {
  // state to trigger re-render of DepartmentList
  const [refresh, setRefresh] = useState(0);

  // callback passed to AddDepartment
  const handleFeeAdded = () => {
    // increment refresh value to force re-render
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="page-container">

      {/* Pass callback to AddDepartment */}
      <AddFee onAdded={handleFeeAdded} />

      {/* Key forces list re-render when refresh changes */}
      <FeeList key={refresh} />
    </div>
  );
}

export default FeesPage;
