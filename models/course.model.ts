import { Temporal } from "@js-temporal/polyfill";

export interface Course {
    readonly id: string;
    title: string;
    capacity: number;
    startDate?: Temporal.PlainDate;
}

export type CourseStatus =
| { status: "DRAFT"; createBy: string; createAt: Temporal.Instant }
| { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllable: string }
| {
    status: "ACTIVE";
    enrolledCount: number;
    startDate: Temporal.PlainDate;
}
| {
    status: "ARCHIVED";
    archivedAt: Temporal.Instant;
    finalEnrollmentCount: number;
}
| { status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant };

export function describeCourse(status: CourseStatus): string {
    // Your switch goes here: Handle all 5 states.
    switch (status.status) {
        // Each case should return a descriptive string using the state-specific fields.
        case "DRAFT":
            return `Draft course created on ${status.createAt}`;
        case "PUBLISHED":
            return `Published on ${status.publishedAt}`;
        case "ACTIVE":
            return `Active with ${status.enrolledCount} students since ${status.startDate}`;
        case "ARCHIVED":
            return `Archived on ${status.archivedAt}`;
        case "CANCELLED":
            return `Cancelled on ${status.cancelledAt}`;
        // Include the default/never check.
        default: {
            const _check: never = status;
            throw new Error(`Unhandled status: ${JSON.stringify(_check)}`);
        }
    }
};