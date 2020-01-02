import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { authorsReducer } from "./authors.reducer";
import { AuthorsEffects } from "./authors.effects";
import { AuthorsFacade } from "./authors.facade";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("authors", authorsReducer),
    EffectsModule.forFeature([AuthorsEffects]),
  ],
  providers: [AuthorsFacade],
})
export class AuthorsStoreModule {}
