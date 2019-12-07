import { AuthorsModel } from "./authors.model";

/**
 * CourseItem interface
 */
export interface CourseItemModel {
  /**
   * name of course
   */
  name: string;

  /**
   * id of course item
   */
  id?: number;

  /**
   * creation date
   */
  date?: Date | number;

  /**
   * course's duration in minutes
   */
  length?: number;

  /**
   * description for course item
   */
  description?: string;

  /**
   * top rated field
   */
  isTopRated?: boolean;

  /**
   * autors field
   */
  authors?: Array<AuthorsModel>;
}
