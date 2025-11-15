import React, { useState } from "react";
import AddFaculty from "./AddFaculty";
import FacultyList from "./FacultyList";
import UpdateFaculty from "./UpdateFaculty";


function FacultyPage() {
  const [refresh, setRefresh] = useState(0);
  const [selectedStudent, setSelectedFaculty] = useState(null); // For edit mode

  // Trigger StudentList re-render
  const handleFacultyAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  // When a student is updated successfully
  const handleFacultyUpdated = () => {
    setSelectedFaculty(null); // Close update form
    setRefresh((prev) => prev + 1);
  };

  // When user clicks “Edit” in StudentList
  const handleEditFaculty = (student) => {
    setSelectedFaculty(student);
  };

  return (
    <div className="page-container">

      {/* Add Student Form */}
      <AddFaculty onAdded={handleFacultyAdded} />

      {/* Student List — pass edit handler */}
      <FacultyList key={refresh} onEdit={handleEditFaculty} />

      {/* Conditionally show update form */}
      {selectedStudent && (
        <UpdateFaculty
          student={selectedStudent}
          onUpdated={handleFacultyUpdated}
        />
      )}
    </div>
  );
}

export default FacultyPage;
