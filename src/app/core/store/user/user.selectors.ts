import { createFeatureSelector, createSelector } from "@ngrx/store";

import { UserState } from "./user.state";

/**
 * User' state selector
 */
export const selectUserState = createFeatureSelector<UserState>("user");

/**
 * User' state data selector
 */
export const selectUserData = createSelector(selectUserState, (state: UserState) => state.data);
