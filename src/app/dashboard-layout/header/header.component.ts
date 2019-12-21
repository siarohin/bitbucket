import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { publishReplay, refCount, tap } from "rxjs/operators";

import { AuthService, UserAuthModel } from "../../core/index";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  private authService: AuthService;
  private router: Router;

  /**
   * user's info
   * Observable<UserAuthModel>
   */
  public user$: Observable<UserAuthModel>;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.user$ = this.authService.user$.pipe(publishReplay(1), refCount());
  }

  /**
   * On logout button click
   */
  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
