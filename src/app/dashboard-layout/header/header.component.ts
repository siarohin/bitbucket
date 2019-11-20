import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService, UserAuthModel } from "../../core/index";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService: AuthService;
  private subscription: Subscription;

  /**
   * isAuthenticated user
   */
  public isAuthenticated: boolean;

  /**
   * user's info
   */
  public user: UserAuthModel;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.subscription = this.authService.getIsAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.subscription.add(
      this.authService.getUserInfo().subscribe(user => {
        this.user = user;
      }),
    );
  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * On logoff button click
   */
  public onLogoffButtonClick(): void {
    this.authService.logOut();
  }
}
