import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { DialogData } from "./models/index";

/**
 * Dialog component
 */
@Component({
  selector: "app-dialog-overview",
  templateUrl: "./dialog-overview.component.html",
  styleUrls: ["./dialog-overview.component.scss"],
})
export class DialogOverviewComponent {
  /**
   * Dialog dialogRef {{ MatDialogRef<DialogOverviewComponent> }}
   */
  public dialogRef: MatDialogRef<DialogOverviewComponent>;

  /**
   * Dialog data {{ DialogData }}
   */
  public data: DialogData;

  constructor(dialogRef: MatDialogRef<DialogOverviewComponent>, @Inject(MAT_DIALOG_DATA) data: DialogData) {
    this.dialogRef = dialogRef;
    this.data = data;
  }

  /**
   * Dialog on cancel button click
   */
  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
