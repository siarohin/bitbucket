import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

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
  private fb: FormBuilder;

  /**
   * Form group
   */
  public courseForm: FormGroup;

  /**
   * Course's duration on existing course
   */
  @Input()
  public durationValue: number;

  /**
   * Event emitter for course's duration changes
   */
  @Output()
  public changeDuration: EventEmitter<number> = new EventEmitter();

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.fb = fb;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.courseForm = this.fb.group({
      duration: [this.durationValue],
    });
  }

  /**
   * On duration input changes
   */
  public onDurationChange(): void {
    const value: string = this.getDuration();
    this.changeDuration.emit(Number(value));
  }

  /**
   * Get duration value
   */
  public getDuration(): string {
    return this.courseForm.get("duration").value;
  }
}
