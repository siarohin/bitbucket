import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { userReducer } from "./user.reducer";
import { UserEffects } from "./user.effects";
import { UserFacade } from "./user.facade";

/**
 * User' store module
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("user", userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserFacade],
})
export class UserStoreModule {}
