import { AuthorsModel } from "../../services/index";

/**
 * AuthorsState model
 */
export interface AuthorsState {
  /**
   * array from authors
   */
  data: ReadonlyArray<AuthorsModel>;
}

/**
 * AuthorsState initial state
 */
export const initialAuthorsState: AuthorsState = {
  data: [],
};
