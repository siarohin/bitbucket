import { InjectionToken } from "@angular/core";

import { API_HOST } from "../constants";

const usersBaseUrl = `${API_HOST}/auth`;

export const UsersAPI = new InjectionToken<string>("UsersAPI");

export const UsersAPIProvider = {
  provide: UsersAPI,
  useValue: usersBaseUrl,
};
