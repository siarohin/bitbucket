import { Params } from "@angular/router";
import { RouterReducerState } from "@ngrx/router-store";

/**
 * RouterStateUrl model
 */
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  fragment: string;
}

/**
 * RouterState model
 */
export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}
