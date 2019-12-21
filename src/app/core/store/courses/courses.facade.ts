import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../app.state";
import { selectCoursesData, selectSelectedCourseByUrl, selectCoursesLength } from "./courses.selectors";
import * as CoursesActions from "./courses.actions";
import { CourseItemModel } from "../../services/index";

/**
 * Courses Facade service
 */
@Injectable()
export class CoursesFacade {
  private store: Store<AppState>;

  /**
   * courses
   */
  public courses$: Observable<ReadonlyArray<CourseItemModel>>;

  /**
   * course
   */
  public course$: Observable<Readonly<CourseItemModel>>;

  /**
   * courses' length
   */
  public isCoursesLength$: Observable<Readonly<boolean>>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.courses$ = this.store.pipe(select(selectCoursesData));
    this.course$ = this.store.pipe(select(selectSelectedCourseByUrl));
    this.isCoursesLength$ = this.store.pipe(select(selectCoursesLength));
  }

  /**
   * get courses
   */
  public getCourses(props?: { isLimited: boolean }): void {
    this.store.dispatch(CoursesActions.getCourses(props));
  }

  /**
   * update course
   */
  public updateCourse(props: { course: CourseItemModel }): void {
    this.store.dispatch(CoursesActions.updateCourse(props));
  }

  /**
   * delete courses
   */
  public deleteCourse(props: { course: CourseItemModel }): void {
    this.store.dispatch(CoursesActions.deleteCourse(props));
  }

  /**
   * create course
   */
  public createCourse(props: { course: CourseItemModel }): void {
    this.store.dispatch(CoursesActions.createCourse(props));
  }

  /**
   * search courses
   */
  public searchCourses(props: { value: string }): void {
    this.store.dispatch(CoursesActions.searchCourses(props));
  }

  /**
   * update courses' length from BE
   */
  public updateCoursesLength(props: { valid: boolean }): void {
    this.store.dispatch(CoursesActions.updateCoursesLength(props));
  }

  /**
   * load more courses
   */
  public loadMoreCourses(): void {
    this.store.dispatch(CoursesActions.loadMoreCourses());
  }
}
