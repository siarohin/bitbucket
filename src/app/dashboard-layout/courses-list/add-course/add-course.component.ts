import { Component, Inject, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { DialogParamsModel, Dictionary } from "../../../core/index";

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
    const { creationDate, description, duration, title, id } = this.params.data;
    this.courseForm = this.fb.group({
      title: [title, Validators.required],
      description: [description, Validators.required],
      duration: [duration, [Validators.minLength(1), Validators.pattern("[0-9]*"), Validators.required]],
      creationDate: [creationDate, Validators.required],
      authors: [],
      id: [id],
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
    const params: DialogParamsModel = { action: this.params.action, data: this.courseForm.value };
    this.dialogRef.close(params);
  }

  /**
   * On change duration value
   * param {{ number }}
   */
  public onChangeDuration(duration: number) {
    this.courseForm.patchValue({ duration });
    this.courseForm.updateValueAndValidity();
  }

  /**
   * On change date value
   * param {{ string }}
   */
  public onChangeDate(date: string) {
    const creationDate: Date = new Date(date);
    this.courseForm.patchValue({ creationDate });
    this.courseForm.updateValueAndValidity();
  }

  /**
   * On change authors value
   * param {{ Array<Dictionary<string>> }}
   */
  public onChangeAuthors(authors: Array<Dictionary<string>>): void {
    this.courseForm.patchValue({ authors });
    this.courseForm.updateValueAndValidity();
  }

  /**
   * Get duration value
   */
  public getDuration(): number {
    return this.courseForm.get("duration").value;
  }

  /**
   * Get serialized date value
   */
  public getDate(): string {
    return this.courseForm.get("creationDate").value;
  }
}
