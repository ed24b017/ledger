import { classifyEmail } from "./ai-classifier.js";

// Sample student profile
const student = {
	major: "Computer Science",
	year: 2,
	courses: ["Data Structures", "Algorithms", "Web Development"],
	clubs: ["Coding Club", "Robotics Society"],
};

// Sample email
const email1 = {
	subject: "Assignment 3 Due This Friday",
	from: "prof.smith@university.edu",
	body: "Reminder: Your data structures assignment is due Friday at 11:59 PM. Please submit via the course portal.",
};

const email2 = {
	subject: "Pizza Party at Student Center",
	from: "events@university.edu",
	body: "Join us for free pizza this Thursday at 6 PM in the student center!",
};

const email3 = {
	subject: "Google SWE Internship Applications Open",
	from: "career-services@university.edu",
	body: "Google is now accepting applications for Summer 2026 Software Engineering internships. Apply by March 1st.",
};

// Test the classification
async function runTests() {
	console.log("Testing Email 1...");
	const result1 = await classifyEmail(email1, student);
	console.log(JSON.stringify(result1, null, 2));

	console.log("\nTesting Email 2...");
	const result2 = await classifyEmail(email2, student);
	console.log(JSON.stringify(result2, null, 2));

	console.log("\nTesting Email 3...");
	const result3 = await classifyEmail(email3, student);
	console.log(JSON.stringify(result3, null, 2));
}

runTests();
