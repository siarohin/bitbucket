import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../services/index";

/**
 * Auth guard
 */
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private authService: AuthService;
  private router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  /**
   * canActivate
   */
  public canActivate(): Promise<boolean> | boolean {
    const isAuthenticated: boolean = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(["/login"]);
    }

    return isAuthenticated;
  }
}
