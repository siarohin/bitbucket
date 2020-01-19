import { Component, OnInit, ChangeDetectionStrategy, Inject, forwardRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  Validators,
  AbstractControl,
} from "@angular/forms";
import isNil from "lodash/isNil";

import { Dictionary } from "../../../../core/index";

/**
 * Simple component that represents course's date creation
 */
@Component({
  selector: "app-creation-course-date",
  templateUrl: "./creation-course-date.component.html",
  styleUrls: ["./creation-course-date.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreationCourseDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CreationCourseDateComponent),
      multi: true,
    },
  ],
})
export class CreationCourseDateComponent implements OnInit, ControlValueAccessor, Validator {
  private fb: FormBuilder;
  private onTouched: () => void;
  private onChange: (_: any) => void;

  /**
   * Form group
   */
  public dateCourseForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.fb = fb;
    this.onTouched = () => {};
    this.onChange = (_: any) => {};
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.dateCourseForm = this.fb.group({
      date: [undefined, Validators.required],
    });
  }

  /**
   * This method is called by the forms API to write to the view when
   * programmatic changes from model to view are requested.
   */
  public writeValue(value: Dictionary<Date>): void {
    const valid: boolean = !isNil(value) && !isNil(value.date);

    if (valid) {
      this.dateCourseForm.patchValue({ date: value.date }, { emitEvent: false });
    }
  }

  /**
   * Registers a callback function that is called when the control's value
   * changes in the UI.
   */
  public registerOnChange(fn: any): void {
    this.dateCourseForm.valueChanges.subscribe(fn);
  }

  /**
   * Registers a callback function is called by the forms API on initialization
   * to update the form model on blur.
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Function that is called by the forms API when the control status changes
   * to or from 'DISABLED'. Depending on the status, it enables or disables
   * the appropriate DOM element.
   */
  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.dateCourseForm.disable() : this.dateCourseForm.enable();
  }

  /**
   * Validate
   */
  public validate(): ValidationErrors | null {
    return this.dateCourseForm.valid
      ? null
      : {
          invalidForm: { valid: false },
        };
  }

  /**
   * `date` abstract control
   */
  public get date(): AbstractControl {
    return this.dateCourseForm.get("date");
  }
}
