import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { FA_ICONS, IconDefinition } from "../../shared/index";
import { CourseItemModel, CoursesListService } from "../../core/index";

/**
 * Font Awesome icons from shared module
 */
const { faClock, faCalendarAlt } = FA_ICONS;

/**
 * Course page
 */
@Component({
  selector: "app-course-page",
  templateUrl: "./course-page.component.html",
  styleUrls: ["./course-page.component.scss"],
})
export class CoursePageComponent implements OnInit {
  private route: ActivatedRoute;
  private coursesListService: CoursesListService;

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
    const id: number = Number(this.route.snapshot.paramMap.get("id"));
    this.course = this.coursesListService.getCourseItem(id);
  }
}
