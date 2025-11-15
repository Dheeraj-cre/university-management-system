const API_URL = "http://localhost:5000/api/students";

// Fetch all students
export async function fetchStudents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch students");
    return await response.json();
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

// Add a new student
export async function addStudent(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add student");
    return await response.json();
  } catch (error) {
    console.error("Error adding student:", error);
  }
}

// Delete a student
export async function deleteStudent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete student");
    return await response.json();
  } catch (error) {
    console.error("Error deleting student:", error);
  }
}

// Update a student
export async function updateStudent(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
