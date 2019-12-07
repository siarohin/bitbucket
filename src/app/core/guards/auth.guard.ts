import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable, of as observableOf } from "rxjs";
import { switchMap } from "rxjs/operators";

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
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getIsAuthenticated().pipe(
      switchMap(isAuthenticated => {
        let isActivate: boolean = true;

        if (!isAuthenticated) {
          isActivate = false;
          this.router.navigate(["/login"]);
        }

        return observableOf(isActivate);
      }),
    );
  }
}
