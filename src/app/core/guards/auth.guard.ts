import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "../services/index";
import { tap } from "rxjs/operators";

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
    return this.authService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(["/login"]);
        }
      }),
    );
  }
}
