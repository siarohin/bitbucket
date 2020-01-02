import { createFeatureSelector } from "@ngrx/store";
import { RouterReducerState } from "@ngrx/router-store";

import { RouterStateUrl } from "./router.state";

/**
 * Routers' state selector
 */
export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>("router");
