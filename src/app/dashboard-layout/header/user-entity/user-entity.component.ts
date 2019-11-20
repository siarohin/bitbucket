import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from "@angular/core";

import { FA_ICONS, IconDefinition } from "../../../shared/index";
import { UserAuthModel } from "../../../core/index";

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

  /**
   * userEntity info
   */
  @Input()
  public user: UserAuthModel;

  /**
   * Event emitter for logoff button click
   */
  @Output()
  public logoffButtonClick: EventEmitter<number> = new EventEmitter();

  /**
   * On logoff button click
   */
  public onLogoffButtonClick() {
    this.logoffButtonClick.emit();
  }
}
