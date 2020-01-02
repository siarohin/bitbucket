import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AuthorsState } from "./authors.state";

/**
 * Authors' state selector
 */
export const selectAuthorsState = createFeatureSelector<AuthorsState>("authors");

/**
 * Authors' state data selector
 */
export const selectAuthorsData = createSelector(selectAuthorsState, (state: AuthorsState) => state.data);
