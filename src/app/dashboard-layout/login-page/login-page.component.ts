import { Component, ChangeDetectionStrategy, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { publishReplay, refCount } from "rxjs/operators";

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
  private fb: FormBuilder;

  /**
   * Form group
   */
  public loginForm: FormGroup;

  /**
   * error
   */
  public errorMsg$: Observable<string>;

  constructor(userFacade: UserFacade, @Inject(FormBuilder) fb: FormBuilder) {
    this.userFacade = userFacade;
    this.fb = fb;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.userFacade.logoutUser();

    this.loginForm = this.fb.group({
      login: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
    });

    this.errorMsg$ = this.userFacade.error$.pipe(publishReplay(1), refCount());
  }

  /**
   * On submit form click
   * param {{ NgForm }}
   */
  public onSubmit() {
    const authentication: AuthenticationModel = {
      login: this.login.value,
      password: this.password.value,
    };

    this.userFacade.authenticateUser({ user: authentication });
  }

  /**
   * `login` abstract control
   */
  public get login(): AbstractControl {
    return this.loginForm.get("login");
  }

  /**
   * `password` abstract control
   */
  public get password(): AbstractControl {
    return this.loginForm.get("password");
  }
}
