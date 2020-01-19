import { createAction, props } from "@ngrx/store";

import { AuthenticationModel, UserAuthModel } from "../../services/index";

/**
 * User' actions
 */
export const getUser = createAction("[Dashboard (App) / Login Page] GET_USER");

export const getUserSuccess = createAction(
  "[Dashboard (App) / Login Page] GET_USER_SUCCESS",
  props<{ user: UserAuthModel }>(),
);

export const getUserError = createAction(
  "[Dashboard (App) / Login Page] GET_USER_ERROR",
  props<{ error: string }>(),
);

export const authenticateUser = createAction(
  "[Login Page] AUTHENTICATE_USER",
  props<{ user: AuthenticationModel }>(),
);

export const logoutUser = createAction("[Header Page] LOGOUT_USER");
