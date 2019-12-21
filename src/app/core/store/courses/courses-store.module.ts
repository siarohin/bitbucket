import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { coursesReducer } from "./courses.reducer";
import { CoursesEffects } from "./courses.effects";
import { CoursesFacade } from "./courses.facade";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("courses", coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  providers: [CoursesFacade],
})
export class CoursesStoreModule {}
