import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of as observableOf } from "rxjs";
import { switchMap } from "rxjs/operators";
import isNil from "lodash/isNil";

import { CoursesListService, CourseItemModel } from "../services/index";

@Injectable({
  providedIn: "root",
})
export class CourseGuard implements CanActivate {
  constructor(private courseListService: CoursesListService, private router: Router) {}

  /**
   * canActivate
   */
  public canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const { params } = next;
    return observableOf(this.isValidCourseItem(params.id));
  }

  private isValidCourseItem(courseId: number): boolean {
    if (isNil(courseId)) {
      return;
    }

    const courseItem: CourseItemModel = this.courseListService.getCourseItem(Number(courseId));

    if (!isNil(courseItem)) {
      return true;
    }

    this.router.navigate(["/courses"]);
    return false;
  }
}
