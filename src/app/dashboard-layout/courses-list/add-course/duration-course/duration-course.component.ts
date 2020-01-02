import { Component, ChangeDetectionStrategy, Inject, OnInit, forwardRef } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormBuilder,
  FormGroup,
  ControlValueAccessor,
  Validator,
  Validators,
  ValidationErrors,
  AbstractControl,
} from "@angular/forms";
import isNil from "lodash/isNil";

import { CustomValidator } from "../../validators/index";
import { Dictionary } from "../../../../core/index";

/**
 * Simple component that represents course's duration creation
 */
@Component({
  selector: "app-duration-course",
  templateUrl: "./duration-course.component.html",
  styleUrls: ["./duration-course.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationCourseComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationCourseComponent),
      multi: true,
    },
  ],
})
export class DurationCourseComponent implements OnInit, ControlValueAccessor, Validator {
  private fb: FormBuilder;
  private onTouched: () => void;
  private onChange: (_: any) => void;

  /**
   * duration' course form
   */
  public durationCourseForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.fb = fb;
    this.onTouched = () => {};
    this.onChange = (_: any) => {};
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.durationCourseForm = this.fb.group({
      length: [undefined, [Validators.required, CustomValidator.validateNumber]],
    });
  }

  /**
   * This method is called by the forms API to write to the view when
   * programmatic changes from model to view are requested.
   */
  public writeValue(value: Dictionary<number>): void {
    const valid: boolean = !isNil(value) && !isNil(value.length);

    if (valid) {
      this.durationCourseForm.patchValue({ length: value.length }, { emitEvent: false });
    }
  }

  /**
   * Registers a callback function that is called when the control's value
   * changes in the UI.
   */
  public registerOnChange(fn: any): void {
    this.durationCourseForm.valueChanges.subscribe(fn);
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
    isDisabled ? this.durationCourseForm.disable() : this.durationCourseForm.enable();
  }

  /**
   * Validate
   */
  public validate(): ValidationErrors | null {
    return this.durationCourseForm.invalid
      ? {
          invalidForm: { valid: false },
        }
      : null;
  }

  /**
   * `length` abstract control
   */
  public get length(): AbstractControl {
    return this.durationCourseForm.get("length");
  }
}
