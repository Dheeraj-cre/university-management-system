// src/api/courseApi.js
const API_URL = "http://localhost:5000/api/courses";

//  Fetch all courses
export async function fetchCourses() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch courses");
    return await res.json();
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
}

//  Add a new course
export async function addCourse(course) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course)
    });
    return await res.json();
  } catch (err) {
    console.error("Error adding course:", err);
  }
}

//  Delete a course
export async function deleteCourse(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    console.error("Error deleting course:", err);
  }
}
