import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CoursesState } from "./courses.state";
import { CourseItemModel } from "../../services/index";
import { selectRouterState } from "../router/index";

/**
 * Courses' state selector
 */
export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

/**
 * Courses' state data selector
 */
export const selectCoursesData = createSelector(selectCoursesState, (state: CoursesState) => state.data);

/**
 * Courses' & Routers' state by Url selector
 */
export const selectSelectedCourseByUrl = createSelector(
  selectCoursesData,
  selectRouterState,
  (courses, router): CourseItemModel => {
    const courseId: string = router.state.params.id;
    if (courseId && Array.isArray(courses)) {
      return courses.find(course => course.id === Number(courseId));
    } else {
      return undefined;
    }
  },
);

/**
 * Courses' state isCoursesLength selector
 */
export const selectCoursesLength = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isCoursesLength,
);
