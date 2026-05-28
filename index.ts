// ==== Exercise 2: TMS Domain Models ====

//  == Step 1 - Create the Model Files ==
// Check ./models

// == Step 2 - Test the Constraints
import { Temporal } from "@js-temporal/polyfill";
import { Student } from "./models/student.model";

const student: Student = {
    id: "STU-001",
    name: "Hana Tadesse",
    enrollmentDate: Temporal.Now.instant(),
};

// Try these what does the compiler say?
student.id = "STU-999";
console.log(student.gpa.toFixed(2));
console.log(student.gpa?.toFixed(2) ?? "Not yet graded");