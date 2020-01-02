import { Action, createReducer, on, ActionReducer } from "@ngrx/store";

import * as CoursesActions from "./courses.actions";
import { CoursesState, initialCoursesState } from "./courses.state";
import { CourseItemModel } from "../../services/index";

const reducer: ActionReducer<CoursesState> = createReducer(
  initialCoursesState,
  on(CoursesActions.getCoursesSuccess, (state, { courses }) => {
    const data: Array<CourseItemModel> = [...courses];
    return { ...state, data };
  }),
  on(CoursesActions.getCoursesError, state => {
    const data: Array<CourseItemModel> = [];
    return { ...state, data };
  }),
  on(CoursesActions.updateCourseSuccess, (state, { courses }) => {
    const data: Array<CourseItemModel> = [...courses];
    return { ...state, data };
  }),
  on(CoursesActions.updateCourseError, state => {
    return { ...state };
  }),
  on(CoursesActions.deleteCourseSuccess, (state, { courses }) => {
    const data: Array<CourseItemModel> = [...courses];
    return { ...state, data };
  }),
  on(CoursesActions.deleteCourseError, state => {
    return { ...state };
  }),
  on(CoursesActions.createCourseSuccess, (state, { courses }) => {
    const data: Array<CourseItemModel> = [...courses];
    return { ...state, data };
  }),
  on(CoursesActions.createCourseError, state => {
    return { ...state };
  }),
  on(CoursesActions.searchCoursesSuccess, (state, { courses }) => {
    const data: Array<CourseItemModel> = [...courses];
    return { ...state, data };
  }),
  on(CoursesActions.searchCoursesError, state => {
    const data: Array<CourseItemModel> = [];
    return { ...state, data };
  }),
  on(CoursesActions.updateCoursesLength, (state, { valid }) => {
    const isCoursesLength: boolean = valid;
    return { ...state, isCoursesLength };
  }),
);

export function coursesReducer(state: CoursesState | undefined, action: Action) {
  return reducer(state, action);
}
