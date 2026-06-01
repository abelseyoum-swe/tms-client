// ==== Exercise 2: TMS Domain Models ====

//  == Step 1 - Create the Model Files ==
// Check ./models

// == Step 2 - Test the Constraints
import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent, parseStudent } from "./models/student.model";
import { AssessmentItem, calculateGrade } from "./models/assessment.model";
import { describeEnrollment, EnrollmentStatus } from "./models/enrollment.model";
import { Course, CourseStatus, describeCourse } from "./models/course.model";
import { ApiResponse, renderResponse } from "./models/api-response.model";

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

console.log(`Quiz grade: ${calculateGrade(quiz)}%`); // 80
console.log(`Lab grade: ${calculateGrade(lab)}%`); // 87

// Verify readonly try this line and check the compiler error:
// quiz.id = "QUIZ-999";
// ERROR: Cannot assign to 'id' because it is a read-only property


// ==== Exercise 5 : Enrollment Lifecycle (State Machine Union) ====

// // Legacy 27 impossible states allowed
// interface EnrollmentBad {
//     isPending: boolean;
//     isApproved: boolean;
//     isActive: boolean;
//     isCompleted: boolean;
//     isDropped: boolean;
// };

// == Step 1 - Model the Enrollment Lifecycle ==
// Check enrollment.model.ts for "type EnrollmentStatus")"

// == Step 2 - Write the Exhaustive Handler ==
// Check enrollment.model.ts for "function describeEnrollment(enrollment: EnrollmentStatus)"

// == Step 3 - Test and Break It ==
const pending: EnrollmentStatus = {
    status: "PENDING",
    requestedAt: Temporal.Now.instant(),
    studentId: "STU-001",
    courseId: "CRS-101",
};

console.log(describeEnrollment(pending));
// Awaiting approval since 2026-05-08T...


// ==== Exercise 5 Part B: Course Lifecycle ====

// Check models/course.model.ts for "type CourseStatus" and "function describeCourse"

const webDev: CourseStatus = {
    status: "ACTIVE",
    enrolledCount: 28,
    startDate: Temporal.PlainDate.from("2026-09-01"),
};
console.log(describeCourse(webDev));
// Should print something like: Active with 28 students since 2026-09-01


// ==== Exercise 6: Reusable API Response (Generics) ====

// == Step 1 - Define the Generic ==
// Check models/api-response.model.ts for "type ApiResponse<T>"

// == Step 2 - Write the Renderer ==
// Check models/api-response.model.ts for "function renderResponse"

// == Step 3 - Test with Different Data Types ==
const studentRes: ApiResponse<Student> = {
    status: "success",
    data: {
        id: "STU-001",
        name: "Dawit Bekele",
        enrollmentDate: Temporal.Now.instant(),
        gpa: 3.4,
    },
    fetchedAt: Temporal.Now.instant(),
};

console.log(
    renderResponse(studentRes, (s) => `${s.name} GPA:${s.gpa ?? "N/A"}`),
);

// Now test with a different data type
const courseListRes: ApiResponse<Course[]> = {
    status: "success",
    data: [
        {
            id: "CRS-101",
            title: "Web Development Fundamentals",
            capacity: 30,
            startDate: Temporal.PlainDate.from("2026-09-01"),
        },
    ],
    fetchedAt: Temporal.Now.instant(),
};

console.log(
    renderResponse(courseListRes, (courses) => 
        courses.map((c) => c.title).join(", "),
    ),
);


// ==== Exercise 7: Temporal Timestamps (Dates, Timezones, Durations) ====

// 1. Record the exact moment an enrollment is approved (UTC)
const approvedAt = Temporal.Now.instant();
console.log(`Approved at (UTC): ${approvedAt.toString({smallestUnit: "second"})}`);

// 2. Display in local timezone
const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");
console.log(`Addis: ${addisTime.toPlainTime().toString({smallestUnit: "second"})}`);
console.log(`London: ${londonTime.toPlainTime().toString({smallestUnit: "second"})}`);
// Same moment, different wall-clock time

// 3. Course start date (date only, no time)
const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();
const daysUntilStart = today.until(courseStart).total({unit: "days"});
console.log(`${Math.floor(daysUntilStart)} days until course starts`);

// 4. Assignment deadline duration
const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(
    `${remaining.total({unit: "days"})} days until assignment is due`,
);