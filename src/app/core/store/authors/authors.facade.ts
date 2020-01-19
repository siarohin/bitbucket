import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../app.state";
import { selectAuthorsData } from "./authors.selectors";
import * as AuthorsActions from "./authors.actions";
import { AuthorsModel } from "../../services/index";

/**
 * Authors Facade service
 */
@Injectable()
export class AuthorsFacade {
  private store: Store<AppState>;

  /**
   * authors
   */
  public authors$: Observable<ReadonlyArray<AuthorsModel>>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.authors$ = this.store.pipe(select(selectAuthorsData));
  }

  /**
   * get authors
   */
  public getAuthors(): void {
    this.store.dispatch(AuthorsActions.getAuthors());
  }
}
