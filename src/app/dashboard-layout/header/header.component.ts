import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { publishReplay, refCount } from "rxjs/operators";

import { UserAuthModel, UserFacade } from "../../core/index";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  private userFacade: UserFacade;

  /**
   * user's info
   * Observable<UserAuthModel>
   */
  public user$: Observable<UserAuthModel>;

  constructor(userFacade: UserFacade) {
    this.userFacade = userFacade;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.user$ = this.userFacade.user$.pipe(publishReplay(1), refCount());
  }

  /**
   * On logout button click
   */
  public onLogout(): void {
    this.userFacade.logoutUser();
  }
}
