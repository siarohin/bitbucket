import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/index";
import { HeaderComponent, UserEntityComponent } from "./header/index";
import { FooterComponent } from "./footer/index";
import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { SearchFormComponent } from "./search-form/index";
import { LoginPageComponent } from "./login-page/index";
import { CoursesListModule } from "./courses-list/index";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    UserEntityComponent,
    SearchFormComponent,
    LoginPageComponent,
  ],
  imports: [CommonModule, SharedModule, CoursesListModule],
  exports: [DashboardLayoutComponent, FooterComponent, HeaderComponent],
})
export class DashboardLayoutModule {}
