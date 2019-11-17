import { Component, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";

import { UserAuthModel } from "../../core/index";

/**
 * Login page component
 */
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  /**
   * Event emitter for submitForm
   * param {{ UserAuthModel }}
   */
  @Output()
  public submitForm: EventEmitter<UserAuthModel> = new EventEmitter();

  /**
   * On submit form click
   * param {{ NgForm }}
   */
  public onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitForm.emit(form.value as UserAuthModel);
    }
  }
}
