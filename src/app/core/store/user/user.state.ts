import { UserAuthModel } from "../../services/index";

/**
 * UserState model
 */
export interface UserState {
  /**
   * users' data
   */
  data: Readonly<UserAuthModel>;

  /**
   * error
   */
  error: string;
}

/**
 * UserState initial state
 */
export const initialUserState: UserState = {
  data: {
    login: undefined,
    password: undefined,
    id: undefined,
    token: undefined,
    name: undefined,
  },
  error: undefined,
};
