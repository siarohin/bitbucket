import { Action, createReducer, on, ActionReducer } from "@ngrx/store";

import { AuthorsState, initialAuthorsState } from "./authors.state";
import * as AuthorsActions from "./authors.actions";
import { AuthorsModel } from "../../services/index";

const reducer: ActionReducer<AuthorsState> = createReducer(
  initialAuthorsState,
  on(AuthorsActions.getAuthorsSuccess, (state, { authors }) => {
    const data: Array<AuthorsModel> = authors;
    return { ...state, data };
  }),
  on(AuthorsActions.getAuthorsError, state => {
    const data: Array<AuthorsModel> = undefined;
    return { ...state, data };
  }),
);

export function authorsReducer(state: AuthorsState | undefined, action: Action) {
  return reducer(state, action);
}
