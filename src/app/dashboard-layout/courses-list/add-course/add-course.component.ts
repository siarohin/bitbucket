import { Component, Inject, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { DialogParamsModel, CourseItemModel } from "../../../core/index";

/**
 * Constant for name' title length validity
 */
const TITLE_LENGTH: number = 50;

/**
 * Constant for description' max length validity
 */
const MAX_LENGTH: number = 500;

/**
 * Simple component that represents dialog on add course
 */
@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCourseComponent implements OnInit {
  private fb: FormBuilder;

  /**
   * Form group
   */
  public courseForm: FormGroup;

  /**
   * Dialog dialogRef {{ MatDialogRef<AddCourseComponent> }}
   */
  public dialogRef: MatDialogRef<AddCourseComponent>;

  /**
   * Dialog data {{ DialogData }}
   */
  public params: DialogParamsModel;

  constructor(
    dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) params: DialogParamsModel,
    @Inject(FormBuilder) fb: FormBuilder,
  ) {
    this.dialogRef = dialogRef;
    this.params = params;
    this.fb = fb;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    const { date, description, length, name, authors } = this.params.data;
    this.courseForm = this.fb.group({
      name: [name, [Validators.required, Validators.maxLength(TITLE_LENGTH)]],
      description: [description, [Validators.required, Validators.maxLength(MAX_LENGTH)]],
      length: [{ length }],
      date: [{ date }],
      authors: [{ authors }],
    });
  }

  /**
   * Dialog on cancel button click
   */
  public onCancelClick(): void {
    this.dialogRef.close();
  }

  /**
   * On submit button click
   */
  public onSubmit(): void {
    const courseItem: CourseItemModel = {
      name: this.name.value,
      description: this.description.value,
      length: this.length.value.length,
      date: this.date.value.date,
      authors: this.authors.value.authors,
      id: this.params.data.id,
    };

    const params: DialogParamsModel = { action: this.params.action, data: courseItem };
    this.dialogRef.close(params);
  }

  /**
   * `name` abstract control
   */
  public get name(): AbstractControl {
    return this.courseForm.get("name");
  }

  /**
   * `description` abstract control
   */
  public get description(): AbstractControl {
    return this.courseForm.get("description");
  }

  /**
   * `length` abstract control
   */
  private get length(): AbstractControl {
    return this.courseForm.get("length");
  }

  /**
   * `date` abstract control
   */
  private get date(): AbstractControl {
    return this.courseForm.get("date");
  }

  /**
   * `authors` abstract control
   */
  private get authors(): AbstractControl {
    return this.courseForm.get("authors");
  }
}
