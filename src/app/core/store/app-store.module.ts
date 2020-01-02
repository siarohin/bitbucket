import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "../../../environments/environment";
import { UserStoreModule } from "./user/index";
import { CoursesStoreModule } from "./courses/index";
import { routerReducers, CustomSerializer } from "./router/index";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      serializer: CustomSerializer,
    }),
    EffectsModule.forRoot([]),
    CoursesStoreModule,
    UserStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class AppStoreModule {}
