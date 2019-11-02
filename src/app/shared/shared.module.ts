import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  IconDefinition,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPlus,
  faSignInAlt,
  faUser,
  faSearch,
  faPen,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { ConvertTimePipe, TruncatePipe } from "./pipes/index";

/**
 * Font Awesome icons
 */
export const FA_ICONS: { [key: string]: IconDefinition } = {
  faClock,
  faCalendarAlt,
  faPlus,
  faSignInAlt,
  faUser,
  faSearch,
  faPen,
  faTrashAlt,
};

@NgModule({
  declarations: [ConvertTimePipe, TruncatePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    FontAwesomeModule,
  ],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    ConvertTimePipe,
    TruncatePipe,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
