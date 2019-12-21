import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { SpinnerModule } from "./widgets/index";
import { ServicesModule, AuthInterceptor, LoaderInterceptor, AppStoreModule } from "./core/index";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardLayoutModule } from "./dashboard-layout/index";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServicesModule,
    AppRoutingModule,
    AppStoreModule,
    DashboardLayoutModule,
    SpinnerModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
