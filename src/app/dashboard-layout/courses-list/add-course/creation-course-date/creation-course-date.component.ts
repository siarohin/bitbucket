import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Inject,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

/**
 * Simple component that represents course's date creation
 */
@Component({
  selector: "app-creation-course-date",
  templateUrl: "./creation-course-date.component.html",
  styleUrls: ["./creation-course-date.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreationCourseDateComponent implements OnInit {
  private fb: FormBuilder;

  /**
   * Form group
   */
  public courseForm: FormGroup;

  /**
   * serializedDate
   */
  @Input()
  public dateValue: string;

  /**
   * Event emitter for course's date changes
   */
  @Output()
  public changeDate: EventEmitter<string> = new EventEmitter();

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.fb = fb;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.courseForm = this.fb.group({
      creationDate: [this.dateValue],
    });
  }

  /**
   * On date input changes
   */
  public onDateChange(): void {
    const date: string = this.courseForm.get("creationDate").value;
    this.changeDate.emit(date);
  }
}
