import { Action, createReducer, on, ActionReducer } from "@ngrx/store";

import { UserState, initialUserState } from "./user.state";
import * as UserActions from "./user.actions";
import { UserAuthModel } from "../../services/index";

const reducer: ActionReducer<UserState> = createReducer(
  initialUserState,
  on(UserActions.getUserSuccess, (state, { user }) => {
    const data: UserAuthModel = user;
    const error: string = undefined;
    return { ...state, data, error };
  }),
  on(UserActions.getUserError, (state, { error }) => {
    const data: UserAuthModel = undefined;
    return { ...state, data, error };
  }),
  on(UserActions.logoutUser, state => {
    const data: UserAuthModel = undefined;
    return { ...state, data };
  }),
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
