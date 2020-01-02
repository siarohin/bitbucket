import { createAction, props } from "@ngrx/store";

import { AuthorsModel } from "../../services/index";

/**
 * Authors' actions
 */
export const getAuthors = createAction("[Dashboard (App) / Courses list] GET_AUTHORS");

export const getAuthorsSuccess = createAction(
  "[Dashboard (App) / Courses list] GET_AUTHORS_SUCCESS",
  props<{ authors: Array<AuthorsModel> }>(),
);

export const getAuthorsError = createAction("[Dashboard (App) / Courses list] GET_AUTHORS_ERROR");
