import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { AuthorsModel, CoursesPerPageModel } from "./services/models/index";

/**
 * Public API
 */
export const API_HOST = "http://localhost:3004";

/**
 * Fake delay time for emitting delay
 */
export const DELAY_TIME = 1000;

/**
 * Count to retry get request
 */
export const RETRY_REQ = 3;

/**
 * Constant for initial CoursesPerPage instance
 */
export const COURSES_PER_PAGE: CoursesPerPageModel = { start: 0, count: 5 };

/**
 * Default debounce time before before new event is emitted
 */
export const DEBOUNCE_TIME = 300;
