import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/index";

import { CoursesListComponent } from "./courses-list.component";
import {
  CreationCourseDateComponent,
  DurationCourseComponent,
  CourseAuthorsComponent,
  AddCourseComponent,
} from "./add-course/index";
import { DeleteCourseComponent } from "./delete-course/index";
import { CourseItemComponent } from "./course-item/index";

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseItemComponent,
    AddCourseComponent,
    DeleteCourseComponent,
    CreationCourseDateComponent,
    DurationCourseComponent,
    CourseAuthorsComponent,
  ],
  imports: [CommonModule, SharedModule],
  entryComponents: [AddCourseComponent, DeleteCourseComponent],
  exports: [CoursesListComponent],
})
export class CoursesListModule {}
