import React, { useState } from "react";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";
import UpdateStudent from "./UpdateStudent";

function StudentPage() {
  const [refresh, setRefresh] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null); // For edit mode

  // Trigger StudentList re-render
  const handleStudentAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  // When a student is updated successfully
  const handleStudentUpdated = () => {
    setSelectedStudent(null); // Close update form
    setRefresh((prev) => prev + 1);
  };

  // When user clicks “Edit” in StudentList
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="page-container">
      <h2>Student Management</h2>

      {/* Add Student Form */}
      <AddStudent onAdded={handleStudentAdded} />

      {/* Student List — pass edit handler */}
      <StudentList key={refresh} onEdit={handleEditStudent} />

      {/* Conditionally show update form */}
      {selectedStudent && (
        <UpdateStudent
          student={selectedStudent}
          onUpdated={handleStudentUpdated}
        />
      )}
    </div>
  );
}

export default StudentPage;
