// tslint:disable:no-conflicting-lifecycle
import { Component, ChangeDetectionStrategy } from "@angular/core";

/**
 * Simple component that represents footer
 */
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
