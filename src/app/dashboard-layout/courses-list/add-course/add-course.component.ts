import { Component, Inject, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { DialogParamsModel } from "../../../core/index";

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
    this.courseForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      duration: ["", Validators.required],
      creationDate: ["", Validators.required],
      authors: [],
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
    const params: DialogParamsModel = { action: "create", data: this.courseForm.value };
    this.dialogRef.close(params);
  }

  /**
   * On change duration value
   * param {{ number }}
   */
  public onChangeDuration(duration: number) {
    this.courseForm.patchValue({ duration });
  }

  /**
   * On change date value
   * param {{ string }}
   */
  public onChangeDate(date: string) {
    const creationDate: Date = new Date(date);
    this.courseForm.patchValue({ creationDate });
  }

  /**
   * On change authors value
   * param {{ Array<{ [key: string]: string }> }}
   */
  public onChangeAuthors(authors: Array<{ [key: string]: string }>): void {
    this.courseForm.patchValue({ authors });
  }
}
