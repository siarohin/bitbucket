/**
 * Courses per page model
 */
export interface CoursesPerPageModel {
  /**
   * Appropriate count of courses
   * (if empty count will be length of courses array)
   */
  start: number;

  /**
   * Courses count from index
   */
  count: number;
}
