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
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import {
  ConvertTimePipe,
  TruncatePipe,
  OrderByPipe,
} from "./pipes/index";
import { HighlightDirective } from "./directives/index";

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
  faStar,
};

@NgModule({
  declarations: [
    ConvertTimePipe,
    TruncatePipe,
    OrderByPipe,
    HighlightDirective,
  ],
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
    FontAwesomeModule,
    ConvertTimePipe,
    TruncatePipe,
    OrderByPipe,
    HighlightDirective,
  ],
})
export class SharedModule {}
