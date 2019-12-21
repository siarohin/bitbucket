import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of as observableOf } from "rxjs";
import isNil from "lodash/isNil";

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
  public canActivate(): Observable<boolean> {
    const isAuthentificated: boolean = !isNil(this.authService.getToken());

    if (!isAuthentificated) {
      this.router.navigate(["/login"]);
    }

    return observableOf(isAuthentificated);
  }
}
