import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of as observableOf } from "rxjs";
import { map, take, catchError, delay } from "rxjs/operators";
import isNil from "lodash/isNil";

import { CoursesListService, CourseItemModel } from "../services/index";
import { DELAY_TIME } from "../constants";

@Injectable({
  providedIn: "root",
})
export class CourseResolveGuard implements Resolve<CourseItemModel> {
  private courseListService: CoursesListService;
  private router: Router;

  constructor(courseListService: CoursesListService, router: Router) {
    this.courseListService = courseListService;
    this.router = router;
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<CourseItemModel> {
    if (!route.paramMap.has("id")) {
      return observableOf(undefined);
    }

    const id: number = +route.paramMap.get("id");

    return this.courseListService.getCourseItem(id).pipe(
      delay(DELAY_TIME),
      map((course: CourseItemModel) => {
        if (isNil(course)) {
          this.router.navigate(["/courses"]);
          return undefined;
        }

        return course;
      }),
      take(1),
      catchError(() => {
        this.router.navigate(["/courses"]);
        return observableOf(undefined);
      }),
    );
  }
}
