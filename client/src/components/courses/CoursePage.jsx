import React, { useState } from "react";
import AddCourse from "./AddCourse";
import CourseList from "./CourseList";

function CoursePage() {
  // state to trigger re-render of DepartmentList
  const [refresh, setRefresh] = useState(0);

  // callback passed to AddDepartment
  const handleCourseAdded = () => {
    // increment refresh value to force re-render
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="page-container">
      <h2>Course</h2>

      {/* Pass callback to AddDepartment */}
      <AddCourse onCourseAdded={handleCourseAdded} />

      {/* Key forces list re-render when refresh changes */}
      <CourseList key={refresh} />
    </div>
  );
}

export default CoursePage;
