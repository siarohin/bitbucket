import { CoursesState } from "./courses/index";
import { UserState } from "./user/index";

export interface AppState {
  courses: CoursesState;
  user: UserState;
}
