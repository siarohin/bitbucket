import { InjectionToken } from "@angular/core";

const coursesBaseUrl = "http://localhost:3000/courses";

export const CoursesAPI = new InjectionToken<string>("CoursesAPI");

export const CoursesAPIProvider = {
  provide: CoursesAPI,
  useValue: coursesBaseUrl,
};
