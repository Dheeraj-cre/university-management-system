// university-management-system/src/api/facultyApi.js


const API_URL = "http://localhost:5000/api/faculty";

// Fetch all faculty members
export async function fetchFaculty() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch faculty");
  return await res.json();
}


// Add a new faculty member
export async function addFaculty(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add faculty");
  return await res.json();
}


// Delete a faculty member by ID
export async function deleteFaculty(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete faculty");
  return await res.json();
}


// Update a faculty member by ID
export async function updateFaculty(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update faculty");
  return await res.json();
}
