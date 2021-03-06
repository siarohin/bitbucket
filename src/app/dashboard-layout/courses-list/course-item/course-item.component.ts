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
   * Highlight value
   */
  @Input()
  public formValue: boolean;

  /**
   * Event emitter for delete button click
   */
  @Output()
  public deleteButtonClick: EventEmitter<number> = new EventEmitter();

  /**
   * Event emitter for course item click
   */
  @Output()
  public courseItemClick: EventEmitter<number> = new EventEmitter();

  /**
   * Event emitter for edit button click
   */
  @Output()
  public editButtonClick: EventEmitter<CourseItemModel> = new EventEmitter();

  /**
   * On edit button click
   */
  public onEditBtnClick(): void {
    const course: CourseItemModel = this.course;
    this.editButtonClick.emit(course);
  }

  /**
   * On delete button click
   */
  public onDeleteBtnClick(): void {
    const { id } = this.course;
    this.deleteButtonClick.emit(id);
  }

  /**
   * On course item click
   */
  public onCourseItemClick(): void {
    const { id } = this.course;
    this.courseItemClick.emit(id);
  }
}
