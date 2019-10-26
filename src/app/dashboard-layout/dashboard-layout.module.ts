import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderComponent, LogoComponent } from "./header/index";
import { FooterComponent } from "./footer/index";
import {
  CoursesListComponent,
  CourseItemComponent,
} from "./courses-list/index";
import { DashboardLayoutComponent } from "./dashboard-layout.component";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    CoursesListComponent,
    CourseItemComponent,
    DashboardLayoutComponent,
  ],
  imports: [CommonModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    CoursesListComponent,
    CourseItemComponent,
    DashboardLayoutComponent,
  ],
})
export class DashboardLayoutModule {}
