/**
 * CourseItem interface
 */
export interface CourseItemModel {
  /**
   * id of course item
   */
  id: number;

  /**
   * title of course
   */
  title: string;

  /**
   * creation date
   */
  creationDate: Date | number;

  /**
   * course's duration in minutes
   */
  duration: number;

  /**
   * description for course item
   */
  description: string;
}
