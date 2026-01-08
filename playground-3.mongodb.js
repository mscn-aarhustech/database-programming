/* global use, db */
// MongoDB Playground
// To run this: Click the "Play" button (triangle) at the top right of the editor.

// 1. SELECT THE DATABASE
// This command switches the context to the 'educational_db' database.
// If it doesn't exist, MongoDB will create it when data is added.
use('educational_db');

// 2. CLEAN SLATE (Optional)
// Drop the 'students' collection if it exists so we start fresh every time we run this.
db.getCollection('students').drop();

// 3. CREATE (Insert Data)
// We are inserting an array of document objects.
db.getCollection('students').insertMany([
  {
    "name": "Alice Johnson",
    "age": 22,
    "major": "Computer Science",
    "gpa": 3.8,
    "enrolled": true,
    "skills": ["Python", "MongoDB", "Linux"]
  },
  {
    "name": "Bob Smith",
    "age": 24,
    "major": "Mathematics",
    "gpa": 3.2,
    "enrolled": false,
    "skills": ["Statistics", "R"]
  },
  {
    "name": "Charlie Brown",
    "age": 21,
    "major": "Computer Science",
    "gpa": 2.9,
    "enrolled": true,
    "skills": ["Java", "SQL"]
  },
  {
    "name": "Diana Prince",
    "age": 23,
    "major": "Physics",
    "gpa": 3.95,
    "enrolled": true,
    "skills": ["Matlab", "Physics", "Math"]
  }
]);

// 4. READ (Query Data)
// Find all students majoring in Computer Science.
const csStudents = db.getCollection('students').find({
  "major": "Computer Science"
});

// Print results to the output window
console.log("--- CS Students ---");
console.log(csStudents);

// 5. UPDATE
// Update 'Alice Johnson' to add a new skill 'Docker'.
db.getCollection('students').updateOne(
  { "name": "Alice Johnson" }, // Filter
  { $push: { "skills": "Docker" } } // Action (Array update)
);

// 6. DELETE
// Delete any student who is not currently enrolled.
db.getCollection('students').deleteMany({
  "enrolled": false
});

// 7. AGGREGATION (Advanced)
// Calculate the average GPA by Major.
const averageGpaByMajor = db.getCollection('students').aggregate([
  {
    $group: {
      _id: "$major", // Group by Major
      avgGpa: { $avg: "$gpa" } // Calculate average
    }
  }
]);

console.log("--- Average GPA by Major ---");
console.log(averageGpaByMajor);