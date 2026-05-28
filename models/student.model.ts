import { Temporal } from "@js-temporal/polyfill";

export interface Student {
    readonly id: string;
    name: string;
    enrollmentDate: Temporal.Instant;
    gpa?: number; // Optional undefined until the student receives a grade
}

export function isStudent(value: unknown): value is Student {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        typeof (value as Record<string, unknown>).id === "string" &&
        typeof (value as Record<string, unknown>).name === "string" 
    );
}