import { CourseItemModel } from "../../services/index";

/**
 * CoursesState model
 */
export interface CoursesState {
  /**
   * array from courses
   */
  data: ReadonlyArray<CourseItemModel>;

  /**
   * is BE can send more courses
   * if `false` prevent request processing
   */
  readonly isCoursesLength: boolean;
}

/**
 * CoursesState initial state
 */
export const initialCoursesState: CoursesState = {
  data: [],
  isCoursesLength: true,
};
