import { InjectionToken } from "@angular/core";

import { API_HOST } from "../constants";

const authorsBaseUrl = `${API_HOST}/authors`;

export const AuthorsAPI = new InjectionToken<string>("AuthorsAPI");

export const AuthorsAPIProvider = {
  provide: AuthorsAPI,
  useValue: authorsBaseUrl,
};
