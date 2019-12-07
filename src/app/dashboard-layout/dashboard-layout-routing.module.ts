import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { PathNotFoundComponent } from "./path-not-found/index";
import { LoginPageComponent } from "./login-page/index";
import { CoursePageComponent } from "./course-page/index";
import { CoursesListComponent } from "./courses-list/index";
import { AuthGuard, CourseResolveGuard } from "../core/index";
import { SearchFormComponent } from "./courses-list/search-form/index";

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
            path: ":id",
            component: CoursePageComponent,
            canActivate: [AuthGuard],
            resolve: {
              course: CourseResolveGuard,
            },
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
