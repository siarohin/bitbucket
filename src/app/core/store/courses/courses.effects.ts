import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf, EMPTY } from "rxjs";
import { switchMap, map, catchError, mergeMap, take } from "rxjs/operators";
import sortBy from "lodash/sortBy";
import isNil from "lodash/isNil";
import last from "lodash/last";
import assign from "lodash/assign";

import * as CoursesActions from "./courses.actions";
import { CoursesListService, CourseItemModel } from "../../services/index";

@Injectable()
export class CoursesEffects {
  private actions$: Actions;
  private coursesListService: CoursesListService;

  /**
   * Effect for processing getCourses
   */
  public getCourses$: Observable<Action>;

  /**
   * Effect for processing updateCourse
   */
  public updateCourse$: Observable<Action>;

  /**
   * Effect for processing deleteCourse
   */
  public deleteCourse$: Observable<Action>;

  /**
   * Effect for processing createCourse
   */
  public createCourse$: Observable<Action>;

  /**
   * Effect for processing searchCourses
   */
  public searchCourses$: Observable<Action>;

  /**
   * Effect for processing loadMoreCourses
   */
  public loadMoreCourses$: Observable<never>;

  constructor(actions$: Actions, coursesListService: CoursesListService) {
    this.actions$ = actions$;
    this.coursesListService = coursesListService;

    this.getCourses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.getCourses),
        switchMap(action =>
          this.coursesListService.getCoursesList(action.isLimited).pipe(
            map(coursesList => CoursesActions.getCoursesSuccess({ courses: coursesList })),
            catchError(() => observableOf(CoursesActions.getCoursesError())),
          ),
        ),
      ),
    );

    this.updateCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.updateCourse),
        switchMap(action =>
          this.coursesListService.updateCourseItem(action.course).pipe(
            map(coursesList => CoursesActions.updateCourseSuccess({ courses: coursesList })),
            catchError(() => observableOf(CoursesActions.updateCourseError())),
          ),
        ),
      ),
    );

    this.deleteCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.deleteCourse),
        switchMap(action =>
          this.coursesListService.removeCourseItem(action.course).pipe(
            map(coursesList => CoursesActions.deleteCourseSuccess({ courses: coursesList })),
            catchError(() => observableOf(CoursesActions.deleteCourseError())),
          ),
        ),
      ),
    );

    this.createCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.createCourse),
        switchMap(action => {
          const isLimited = false;
          const courseToAdd: CourseItemModel = action.course;
          // request for all courses without length limit to get last id parameter
          return this.coursesListService.getCoursesList(isLimited).pipe(
            switchMap(courseList => {
              const sortedCourses: Array<CourseItemModel> = sortBy(courseList, ["id"]);
              const id: number = !isNil(last(sortedCourses)) ? last(sortedCourses).id + 1 : 1;
              const course: CourseItemModel = assign({}, courseToAdd, { id });
              return this.coursesListService
                .createCourseItem(course)
                .pipe(map(coursesList => CoursesActions.createCourseSuccess({ courses: coursesList })));
            }),
            catchError(() => observableOf(CoursesActions.createCourseError())),
          );
        }),
      ),
    );

    this.searchCourses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.searchCourses),
        switchMap(action =>
          this.coursesListService.searchCourses(action.value).pipe(
            mergeMap(coursesList => [
              CoursesActions.searchCoursesSuccess({ courses: coursesList }),
              CoursesActions.updateCoursesLength({ valid: false }),
            ]),
            catchError(() => observableOf(CoursesActions.searchCoursesError())),
          ),
        ),
      ),
    );

    this.loadMoreCourses$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(CoursesActions.loadMoreCourses),
          switchMap(() => {
            this.coursesListService.loadMoreCourses();
            return EMPTY;
          }),
        ),
      { dispatch: false },
    );
  }
}
