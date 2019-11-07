import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/index";
import { HeaderComponent, UserEntityComponent } from "./header/index";
import { FooterComponent } from "./footer/index";
import {
  CoursesListComponent,
  CourseItemComponent,
} from "./courses-list/index";
import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { SearchFormComponent } from "./search-form/index";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CoursesListComponent,
    CourseItemComponent,
    DashboardLayoutComponent,
    UserEntityComponent,
    SearchFormComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    DashboardLayoutComponent,
    FooterComponent,
    HeaderComponent,
  ],
})
export class DashboardLayoutModule {}