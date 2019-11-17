import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/index";
import { HeaderComponent, UserEntityComponent } from "./header/index";
import { FooterComponent } from "./footer/index";
import { CoursesListComponent, CourseItemComponent, DialogOverviewComponent } from "./courses-list/index";
import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { SearchFormComponent } from "./search-form/index";
import { LoginPageComponent } from "./login-page/index";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CoursesListComponent,
    CourseItemComponent,
    DashboardLayoutComponent,
    UserEntityComponent,
    SearchFormComponent,
    DialogOverviewComponent,
    LoginPageComponent,
  ],
  imports: [CommonModule, SharedModule],

  entryComponents: [DialogOverviewComponent],
  exports: [DashboardLayoutComponent, FooterComponent, HeaderComponent],
})
export class DashboardLayoutModule {}
