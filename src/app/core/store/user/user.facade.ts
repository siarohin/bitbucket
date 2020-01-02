import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../app.state";
import { selectUserData } from "./user.selectors";
import * as UserActions from "./user.actions";
import { UserAuthModel, AuthenticationModel } from "../../services/index";

/**
 * User Facade service
 */
@Injectable()
export class UserFacade {
  private store: Store<AppState>;

  /**
   * user
   */
  public user$: Observable<Readonly<UserAuthModel>>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.user$ = this.store.pipe(select(selectUserData));
  }

  /**
   * get user
   */
  public getUser(): void {
    this.store.dispatch(UserActions.getUser());
  }

  /**
   * authenticate user
   */
  public authenticateUser(props: { user: AuthenticationModel }): void {
    this.store.dispatch(UserActions.authenticateUser(props));
  }

  /**
   * logout user
   */
  public logoutUser(): void {
    this.store.dispatch(UserActions.logoutUser());
  }
}
