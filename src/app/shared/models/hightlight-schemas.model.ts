/**
 * HighlightSchemas interface
 */
export interface HighlightSchemas {
  /**
   * Freshes course schema
   */
  isFreshCourse: string | boolean;

  /**
   * Planned course schema
   */
  isPlannedCourse: string | boolean;

  /**
   * Top rated course schema
   */
  isTopRated?: string | boolean;
}
