// src/api/departmentApi.js
const API_URL = "http://localhost:5000/api/departments";

// Fetch all departments
export async function fetchDepartments() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch departments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}

// Add new department
export async function addDepartment(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add department");
    return await response.json();
  } catch (error) {
    console.error("Error adding department:", error);
  }
}

// Delete department
export async function deleteDepartment(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete department");
    return await response.json();
  } catch (error) {
    console.error("Error deleting department:", error);
  }
}
