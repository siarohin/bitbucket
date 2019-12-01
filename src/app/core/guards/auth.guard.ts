import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable, of as observableOf } from "rxjs";
import { switchMap } from "rxjs/operators";

import { AuthService } from "../services/index";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * canActivate
   */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getIsAuthenticated().pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return observableOf(true);
        }

        this.router.navigate(["/login"]);
        return observableOf(false);
      }),
    );
  }
}
