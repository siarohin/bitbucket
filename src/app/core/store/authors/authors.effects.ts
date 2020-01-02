import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

import { AuthorsListService } from "../../services/index";
import * as AuthorsActions from "./authors.actions";

/**
 * Authors' effects
 */
@Injectable()
export class AuthorsEffects {
  private authorsService: AuthorsListService;
  private actions$: Actions;

  /**
   * Effect for processing getAuthors
   */
  public getAuthors$: Observable<Action>;

  constructor(actions$: Actions, authorsService: AuthorsListService) {
    this.actions$ = actions$;
    this.authorsService = authorsService;

    this.getAuthors$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthorsActions.getAuthors),
        switchMap(() =>
          this.authorsService.getAuthors().pipe(
            map(authors => AuthorsActions.getAuthorsSuccess({ authors })),
            catchError(() => observableOf(AuthorsActions.getAuthorsError())),
          ),
        ),
      ),
    );
  }
}
