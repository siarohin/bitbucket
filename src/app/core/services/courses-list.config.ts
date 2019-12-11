import { InjectionToken } from "@angular/core";

import { API_HOST } from "../constants";

const coursesBaseUrl = `${API_HOST}/courses`;

export const CoursesAPI = new InjectionToken<string>("CoursesAPI");

export const CoursesAPIProvider = {
  provide: CoursesAPI,
  useValue: coursesBaseUrl,
};
