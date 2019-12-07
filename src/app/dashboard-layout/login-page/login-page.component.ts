import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { AuthService } from "../../core/index";

/**
 * Simple component that represents login page
 */
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private authService: AuthService;
  private router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
    this.authService.logout();
  }

  /**
   * On submit form click
   * param {{ NgForm }}
   */
  public onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.authenticate(form.value.login as string, form.value.password as string).then(() => {
        this.router.navigate(["/courses"]);
      });
    }
  }
}
