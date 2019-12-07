import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { of as observableOf, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

import { FA_ICONS, IconDefinition, AutoUnsubscribe } from "../../shared/index";
import { CourseItemModel, CoursesListService } from "../../core/index";

/**
 * Font Awesome icons from shared module
 */
const { faClock, faCalendarAlt } = FA_ICONS;

/**
 * Course page
 */
@AutoUnsubscribe()
@Component({
  selector: "app-course-page",
  templateUrl: "./course-page.component.html",
  styleUrls: ["./course-page.component.scss"],
})
export class CoursePageComponent implements OnInit {
  private route: ActivatedRoute;
  private coursesListService: CoursesListService;
  private subscription: Subscription;

  /**
   * Fontawesome icons
   */
  public faClock: IconDefinition = faClock;
  public faCalendarAlt: IconDefinition = faCalendarAlt;

  /**
   * course item
   */
  public course: CourseItemModel;

  constructor(route: ActivatedRoute, coursesListService: CoursesListService) {
    this.route = route;
    this.coursesListService = coursesListService;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return params.get("id")
            ? this.coursesListService.getCourseItem(+params.get("id"))
            : observableOf(undefined);
        }),
      )
      .subscribe(course => (this.course = course));
  }
}
