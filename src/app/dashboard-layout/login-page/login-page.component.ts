import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import isNil from "lodash/isNil";

import { AuthService, AuthenticationModel } from "../../core/index";
import { AutoUnsubscribe } from "../../shared/index";

/**
 * Simple component that represents login page
 */
@AutoUnsubscribe()
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  private authService: AuthService;
  private router: Router;
  private authSubj: Subject<AuthenticationModel> = new Subject();
  private subscription: Subscription;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
    this.authService.logout();
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.subscription = this.authSubj
      .asObservable()
      .pipe(switchMap(authUser => this.authService.authenticate(authUser)))
      .subscribe(user => {
        if (!isNil(user)) {
          this.router.navigate(["/courses"]);
        }
      });
  }

  /**
   * On submit form click
   * param {{ NgForm }}
   */
  public onSubmit(form: NgForm) {
    if (form.valid) {
      const authData: AuthenticationModel = {
        login: form.value.login as string,
        password: form.value.password as string,
      };
      this.authSubj.next(authData);
    }
  }
}
