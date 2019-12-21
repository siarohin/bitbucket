import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { publishReplay, refCount } from "rxjs/operators";

import { FA_ICONS, IconDefinition } from "../../shared/index";
import { CourseItemModel, CoursesFacade } from "../../core/index";

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
  private coursesFacade: CoursesFacade;

  /**
   * Fontawesome icons
   */
  public faClock: IconDefinition = faClock;
  public faCalendarAlt: IconDefinition = faCalendarAlt;

  /**
   * course item
   */
  public course$: Observable<CourseItemModel>;

  constructor(coursesFacade: CoursesFacade) {
    this.coursesFacade = coursesFacade;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.course$ = this.coursesFacade.course$.pipe(publishReplay(1), refCount());
  }
}
