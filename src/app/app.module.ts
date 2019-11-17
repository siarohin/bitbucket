import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ServicesModule } from "./core/index";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardLayoutModule } from "./dashboard-layout/index";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DashboardLayoutModule, ServicesModule, AppRoutingModule],
  providers: [ServicesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
