import { Component, ChangeDetectionStrategy, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import isNaN from "lodash/isNaN";

/**
 * Simple component that represents course's duration creation
 */
@Component({
  selector: "app-duration-course",
  templateUrl: "./duration-course.component.html",
  styleUrls: ["./duration-course.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationCourseComponent {
  /**
   * Is valid duration input value
   */
  public isValid = false;

  /**
   * Course's duration
   */
  public duration: FormControl = new FormControl("");

  /**
   * Event emitter for course's duration changes
   */
  @Output()
  public changeDuration: EventEmitter<number> = new EventEmitter();

  /**
   * On duration keyUp changes
   */
  public onKeyUp(): void {
    this.isValid = this.duration.valid && !isNaN(Number(this.duration.value));
  }

  /**
   * On duration input changes
   */
  public onDurationChange(): void {
    if (this.isValid) {
      const duration: number = Number(this.duration.value);
      this.changeDuration.emit(duration);
    }
  }
}
