import { createAction, props } from "@ngrx/store";

import { CourseItemModel } from "../../services/index";

/**
 * Courses' actions
 */
export const getCourses = createAction("[Courses Page] GET_COURSES", props<{ isLimited?: boolean }>());

export const getCoursesSuccess = createAction(
  "[Courses Page] GET_COURSES_SUCCESS",
  props<{ courses: Array<CourseItemModel> }>(),
);

export const getCoursesError = createAction<"[Courses Page] GET_COURSES_ERROR">(
  "[Courses Page] GET_COURSES_ERROR",
);

export const searchCourses = createAction("[Courses Page] SEARCH_COURSES", props<{ value: string }>());

export const searchCoursesSuccess = createAction(
  "[Courses Page] SEARCH_COURSES_SUCCESS",
  props<{ courses: Array<CourseItemModel> }>(),
);

export const searchCoursesError = createAction("[Courses Page] SEARCH_COURSES_ERROR");

export const updateCoursesLength = createAction(
  "[Courses Service (App)] UPDATE_COURSES_LENGTH",
  props<{ valid: boolean }>(),
);

export const loadMoreCourses = createAction("[Courses Page] LOAD_MORE_COURSES");

/**
 * Course' actions
 */
export const updateCourse = createAction(
  "[Courses Page / Dialog] UPDATE_COURSE",
  props<{ course: CourseItemModel }>(),
);

export const updateCourseSuccess = createAction(
  "[Courses Page / Dialog] UPDATE_COURSE_SUCCESS",
  props<{ courses: Array<CourseItemModel> }>(),
);

export const updateCourseError = createAction("[Courses Page / Dialog] UPDATE_COURSE_ERROR");

export const deleteCourse = createAction(
  "[Courses Page / Dialog] DELETE_COURSE",
  props<{ course: CourseItemModel }>(),
);

export const deleteCourseSuccess = createAction(
  "[Courses Page / Dialog] DELETE_COURSE_SUCCESS",
  props<{ courses: Array<CourseItemModel> }>(),
);

export const deleteCourseError = createAction("[Courses Page / Dialog] DELETE_COURSE_ERROR");

export const createCourse = createAction(
  "[Courses Page] CREATE_COURSE",
  props<{ course: CourseItemModel }>(),
);

export const createCourseSuccess = createAction(
  "[Courses Page] CREATE_COURSE_SUCCESS",
  props<{ courses: Array<CourseItemModel> }>(),
);

export const createCourseError = createAction("[Courses Page] CREATE_COURSE_ERROR");
