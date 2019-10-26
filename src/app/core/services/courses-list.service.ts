import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { refCount, publishReplay } from "rxjs/operators";

import { CourseItemModel } from "./models/index";
import { DEFAULT_CONFIG } from "./courses.config";

/**
 * Courses list service
 */
@Injectable({
  providedIn: "root",
})
export class CoursesListService {
  private coursesListSubj: BehaviorSubject<
    Array<CourseItemModel>
  > = new BehaviorSubject(DEFAULT_CONFIG);

  /**
   * Observable of courses list
   */
  public coursesList$: Observable<Array<CourseItemModel>>;

  constructor() {
    this.coursesList$ = this.coursesListSubj.asObservable().pipe(
      publishReplay(1),
      refCount(),
    );
  }
}
