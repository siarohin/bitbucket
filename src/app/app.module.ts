import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DashboardLayoutModule } from "./dashboard-layout/index";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DashboardLayoutModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
