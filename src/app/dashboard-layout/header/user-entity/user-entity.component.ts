import { Component, ChangeDetectionStrategy } from "@angular/core";

import { FA_ICONS, IconDefinition } from "../../../shared/index";

/**
 * Font Awesome icons from shared module
 */
const { faSignInAlt, faUser } = FA_ICONS;

/**
 * Simple component that represents user entity form
 */
@Component({
  selector: "app-user-entity",
  templateUrl: "./user-entity.component.html",
  styleUrls: ["./user-entity.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEntityComponent {
  /**
   * Fontawesome icons
   */
  public faSignInAlt: IconDefinition = faSignInAlt;
  public faUser: IconDefinition = faUser;
}
