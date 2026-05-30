// ==== Exercise 2: TMS Domain Models ====

//  == Step 1 - Create the Model Files ==
// Check ./models

// == Step 2 - Test the Constraints
import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent, parseStudent } from "./models/student.model";
import { AssessmentItem, calculateGrade } from "./models/assessment.model";

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


// ==== Exercise 3 Part B: Throwing on Invalid Data ====

console.log(parseStudent({ id: "STU-001", name: "Hana" }));
// Prints a valid Student object

// parseStudent({ id: 42, name: "Test" });
// Throws: TypeError: Expected id to be a string received number


// ==== Exercise 4: Assessment Type (Discriminated Unions) ====

// == Step 1 - Define the Union ==
// Check assessment.model.ts for "interface Quiz" and "interface LabAssignment"

// == Step 2 - Write the Grade Calculator ==
// Check assessment.model.ts for "function calculateGrade)item: AssessmentItem"

// == Step 3 - Test it ==
const quiz: AssessmentItem = {
    id: "QUIZ-001",
    kind: "quiz",
    title: "SQL Basics",
    correctAnswers: 8,
    totalQuestions: 10,
};

const lab: AssessmentItem = {
    id: "LAB-001",
    kind: "lab",
    title: "REST API Project",
    functionalityScore: 85,
    codeQualityScore: 90,
};

console.log(`Quiz grade: ${calculateGrade(quiz)%}`); // 80
console.log(`Lab grade: ${calculateGrade(lab)}%`); // 87

// Verify readonly try this line and check the compiler error:
quiz.id = "QUIZ-999";
// ERROR: Cannot assign to 'id' because it is a read-only property