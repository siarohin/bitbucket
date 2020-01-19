import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { tap, switchMap, map, catchError, mergeMap } from "rxjs/operators";

import { AuthService, StorageService } from "../../services/index";
import * as UserActions from "./user.actions";
import { CoursesActions } from "../courses/index";

/**
 * Constant for token name
 */
const TOKEN = "token";

/**
 * User' effects
 */
@Injectable()
export class UserEffects {
  private router: Router;
  private authService: AuthService;
  private storageService: StorageService;
  private actions$: Actions;

  /**
   * Effect for processing authenticateUser
   */
  public authenticateUser$: Observable<Action>;

  /**
   * Effect for processing getUser
   */
  public getUser$: Observable<Action>;

  /**
   * Effect for processing logoutUser
   */
  public logoutUser$: Observable<Action>;

  constructor(actions$: Actions, router: Router, authService: AuthService, storageService: StorageService) {
    this.actions$ = actions$;
    this.router = router;
    this.authService = authService;
    this.storageService = storageService;

    this.authenticateUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.authenticateUser),
        switchMap(action => {
          return this.authService.authenticate(action.user).pipe(
            tap(response => {
              const token: string = response ? response.token : undefined;
              this.setTokenToStorage(token);
            }),
            map(() => UserActions.getUser()),
            catchError(error => observableOf(UserActions.getUserError(error))),
          );
        }),
      ),
    );

    this.getUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.getUser),
        switchMap(() =>
          this.authService.getUser(this.getTokenFromStorage()).pipe(
            map(user => {
              if (user) {
                this.router.navigate(["/courses"]);
                return UserActions.getUserSuccess({ user });
              } else {
                const error: string = "Invalid login or password";
                return UserActions.getUserError({ error });
              }
            }),
            catchError(error => observableOf(UserActions.getUserError(error))),
          ),
        ),
      ),
    );

    this.logoutUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.logoutUser),
        tap(() => {
          this.deleteTokenFromStorage();
          this.router.navigate(["/login"]);
        }),
        // dispatch to clear all courses
        mergeMap(() => [CoursesActions.getCoursesError(), UserActions.getUserError(undefined)]),
      ),
    );
  }

  /**
   * Get token from storage
   */
  private getTokenFromStorage(): string {
    return this.storageService.getItem(TOKEN);
  }

  /**
   * Set token to storage
   */
  private setTokenToStorage(token: string): void {
    this.storageService.setItem(TOKEN, token);
  }

  /**
   * delete token from storage
   */
  private deleteTokenFromStorage(): void {
    this.storageService.removeItem([TOKEN]);
  }
}
