// ==== Exercise 2: TMS Domain Models ====

//  == Step 1 - Create the Model Files ==
// Check ./models

// == Step 2 - Test the Constraints
import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent } from "./models/student.model";

const student: Student = {
    id: "STU-001",
    name: "Hana Tadesse",
    enrollmentDate: Temporal.Now.instant(),
};

// Try these what does the compiler say?
// student.id = "STU-999";
// console.log(student.gpa.toFixed(2));
console.log(student.gpa?.toFixed(2) ?? "Not yet graded");

// ==== Exercise 3: Safe API Parsing (Type Guards and Unknown) ====

// Legacy dangerous
// function processStudent(data: any) {
//     console.log(`GPA: ${data.gpa.toFixed(2)}`); // Crashes if gpa is missing or not a number
// }

// == Step 1 - Understand the Problem ==
// == Step 2 - Write a Tyoe Guard ==
// Check ./models/students.model.ts

function processStudent(raw: unknown) {
    if (isStudent(raw)) {
        const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";
        console.log(`Student ${raw.name} GPA: ${gpaDisplay}`);
    } else {
        console.error("Invalid student data received");
    }
}

// Step 3 - Test It
processStudent({id: "STU-001", name: "Hana", gpa: 3.7});
// Prints: Student Hana GPA: 3.70

processStudent(42);
// Prints: Invalid student data