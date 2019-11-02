import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardLayoutComponent } from "./dashboard-layout/index";

const routes: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent,
    pathMatch: "full",
  },
  {
    path: "**",
    component: DashboardLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
