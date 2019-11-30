import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { DialogParamsModel } from "../../../core/index";

/**
 * Simple component that represents dialog on delete course
 */
@Component({
  selector: "app-delete-course",
  templateUrl: "./delete-course.component.html",
  styleUrls: ["./delete-course.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCourseComponent {
  /**
   * Dialog dialogRef {{ MatDialogRef<DeleteCourseComponent> }}
   */
  public dialogRef: MatDialogRef<DeleteCourseComponent>;

  /**
   * Dialog data {{ DialogParamsModel }}
   */
  public params: DialogParamsModel;

  constructor(
    dialogRef: MatDialogRef<DeleteCourseComponent>,
    @Inject(MAT_DIALOG_DATA) params: DialogParamsModel,
  ) {
    this.dialogRef = dialogRef;
    this.params = params;
  }

  /**
   * Dialog on cancel button click
   */
  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
