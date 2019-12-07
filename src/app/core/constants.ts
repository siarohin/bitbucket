import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { AuthorsModel } from "./services/models/index";

/**
 * Fake delay time for emitting delay
 */
export const DELAY_TIME = 1000;

/**
 * Count to retry get request
 */
export const RETRY_REQ = 3;

/**
 * Count of courses
 */
export const COURSES_PER_PAGE = 5;

/**
 * Array with keyCodes
 */
export const KEY_KODES: Array<number> = [ENTER, COMMA];

/**
 * Default author
 */
export const DEFAULT_AUTHOR: AuthorsModel = { name: "John", lastName: "Doe", id: undefined };
