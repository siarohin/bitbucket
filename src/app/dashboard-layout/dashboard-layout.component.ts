import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService, UserAuthModel } from "../core/index";
import { AutoUnsubscribe } from "../shared/index";

/**
 * Dashboard layout component
 */
@AutoUnsubscribe()
@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent implements OnInit {
  private authService: AuthService;
  private subscription: Subscription;

  /**
   * isAuthenticated user
   */
  public isAuthenticated: boolean;

  /**
   * User's input value
   */
  public inputValue: string;

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
  }

  /**
   * User's input on search button click
   */
  public onSearchButtonClick(value: string): void {
    this.inputValue = value;
  }

  /**
   * Update user's info
   */
  public onSubmitForm(user: UserAuthModel): void {
    this.authService.logIn(user);
  }
}
