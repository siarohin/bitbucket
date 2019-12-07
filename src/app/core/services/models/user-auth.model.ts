import { NameModel } from "./name.model";

/**
 *  UserAuth interface
 */
export interface UserAuthModel {
  login: string;
  password?: string;
  id?: number;
  fakeToken?: string;
  name?: NameModel;
}
