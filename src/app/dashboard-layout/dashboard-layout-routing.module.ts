import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { PathNotFoundComponent } from "./path-not-found/index";
import { LoginPageComponent } from "./login-page/index";
import { CoursePageComponent } from "./course-page/index";
import { CoursesListComponent } from "./courses-list/index";
import { AuthGuard, CourseGuard } from "../core/index";
import { SearchFormComponent } from "./search-form/index";

const routes: Routes = [
  {
    path: "courses",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "",
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            component: CoursesListComponent,
            data: { title: "Courses list" },
          },
          {
            path: "",
            pathMatch: "full",
            component: SearchFormComponent,
            outlet: "search",
          },
          {
            path: ":id",
            canActivate: [CourseGuard], // check existing id
            component: CoursePageComponent,
            data: { title: "Course page" },
          },
        ],
      },
    ],
  },
  {
    path: "login",
    component: LoginPageComponent,
    data: { title: "Login" },
  },
  {
    path: "404",
    component: PathNotFoundComponent,
    data: { title: "Page Not Found" },
  },
  {
    path: "**",
    redirectTo: "404",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardLayoutRoutingModule {}
