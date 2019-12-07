import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/index";
import { HeaderComponent, UserEntityComponent } from "./header/index";
import { FooterComponent } from "./footer/index";
import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { LoginPageComponent } from "./login-page/index";
import { CoursesListModule } from "./courses-list/index";
import { CoursePageComponent } from "./course-page/index";
import { PathNotFoundComponent } from "./path-not-found/index";
import { DashboardLayoutRoutingModule } from "./dashboard-layout-routing.module";
import { SpinnerModule } from "../widgets/index";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    UserEntityComponent,
    LoginPageComponent,
    PathNotFoundComponent,
    CoursePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesListModule,
    SpinnerModule.forRoot(),
    DashboardLayoutRoutingModule,
  ],
  exports: [DashboardLayoutComponent, FooterComponent, HeaderComponent],
})
export class DashboardLayoutModule {}
