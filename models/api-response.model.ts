import { Temporal } from "@js-temporal/polyfill";

export type ApiResponse<T> =
| { status: "loading" }
| { status: "success"; data: T; fetchedAt: Temporal.Instant }
| { status: "error"; message: string; statusCode: number }

export function renderResponse<T>(
    response: ApiResponse<T>,
    formatter: (data: T) => string,
): string {
    // TODO: Handle all three states with a switch on response.status.
    switch (response.status) {
        // "loading" -> return "Loading..."
        case "loading":
            return `Loading ...`;
        // "success" -> call the formatter with response.data
        case "success":
            return formatter(response.data);
        // "error" -> return a string with the statusCode and message
        case "error":
            return `${response.statusCode}: ${response.message}`;   
    }
};