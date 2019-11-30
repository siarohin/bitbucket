/**
 * CourseItem interface
 */
export interface CourseItemModel {
  /**
   * title of course
   */
  title: string;

  /**
   * id of course item
   */
  id?: number;

  /**
   * creation date
   */
  creationDate?: Date | number;

  /**
   * course's duration in minutes
   */
  duration?: number;

  /**
   * description for course item
   */
  description?: string;

  /**
   * top rated field
   */
  isTopRated?: boolean;
}
