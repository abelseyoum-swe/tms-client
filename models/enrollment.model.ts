import { Temporal } from "@js-temporal/polyfill";

export interface Course {
    readonly studentId: string;
    readonly courseCode: string;
    enrolledAt: Temporal.Instant;
}