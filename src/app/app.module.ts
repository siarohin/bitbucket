import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/index";
import { HeaderComponent, LogoComponent } from "./header/index";
import { BreadcrumbsComponent } from "./breadcrumbs/index";
import { SectionComponent } from "./section/index";
import {
  CoursesListComponent,
  CourseItemComponent,
} from "./courses-list/index";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    BreadcrumbsComponent,
    SectionComponent,
    CoursesListComponent,
    CourseItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
