import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { publishReplay, refCount } from "rxjs/operators";

import { CoursesListService, CourseItemModel } from "../core/index";

/**
 * Smart dashboard layout component
 */
@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent implements OnInit {
  private coursesListService: CoursesListService;

  /**
   * Observable of courses list
   */
  public coursesList$: Observable<Array<CourseItemModel>>;

  constructor(coursesListService: CoursesListService) {
    this.coursesListService = coursesListService;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.coursesList$ = this.coursesListService.coursesList$.pipe(
      publishReplay(1),
      refCount(),
    );
  }

  /**
   * User's input on search button click
   */
  public searchButtonClick(value: string): void {
    console.log(value);
  }
}
