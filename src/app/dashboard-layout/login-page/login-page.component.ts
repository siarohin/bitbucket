import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthenticationModel, UserFacade } from "../../core/index";

/**
 * Simple component that represents login page
 */
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  private userFacade: UserFacade;

  constructor(userFacade: UserFacade) {
    this.userFacade = userFacade;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.userFacade.logoutUser();
  }

  /**
   * On submit form click
   * param {{ NgForm }}
   */
  public onSubmit(form: NgForm) {
    if (form.valid) {
      const authentication: AuthenticationModel = {
        login: form.value.login as string,
        password: form.value.password as string,
      };

      this.userFacade.authenticateUser({ user: authentication });
    }
  }
}
