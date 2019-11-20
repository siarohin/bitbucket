import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";

import { FA_ICONS, IconDefinition, HighlightSchemas } from "../../../shared/index";
import { CourseItemModel } from "../../../core/index";

/**
 * Font Awesome icons from shared module
 */
const { faClock, faCalendarAlt, faPen, faTrashAlt, faStar } = FA_ICONS;

/**
 * Simple component that represents course item
 */
@Component({
  selector: "app-course-item",
  templateUrl: "./course-item.component.html",
  styleUrls: ["./course-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  /**
   * Fontawesome icons
   */
  public faClock: IconDefinition = faClock;
  public faCalendarAlt: IconDefinition = faCalendarAlt;
  public faPen: IconDefinition = faPen;
  public faTrashAlt: IconDefinition = faTrashAlt;
  public faStar: IconDefinition = faStar;

  /**
   * Highlight schemas for component
   */
  public schemas: HighlightSchemas = {
    isFreshCourse: "highlight-schema-fresh",
    isPlannedCourse: "highlight-schema-planned",
    isTopRated: "highlight-schema-top-rated",
  };

  /**
   * Course item
   */
  @Input()
  public course: CourseItemModel;

  /**
   * Is item last in course
   */
  @Input()
  public isLast: boolean;

  /**
   * Event emitter for delete button click
   */
  @Output()
  public deleteButtonClick: EventEmitter<number> = new EventEmitter();

  /**
   * On edit button click
   */
  public onEditBtnClick(): void {
    console.log("Button 'Edit' was clicked");
  }

  /**
   * On delete button click
   */
  public onDeleteBtnClick(): void {
    const { id } = this.course;
    this.deleteButtonClick.emit(id);
  }
}
