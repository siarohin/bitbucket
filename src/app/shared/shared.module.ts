import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule, MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter } from "@angular/material";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition, faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faPlus,
  faSignInAlt,
  faUser,
  faSearch,
  faPen,
  faTrashAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { ConvertTimePipe, TruncatePipe, OrderByPipe, HighlightSearch } from "./pipes/index";
import { HighlightDirective } from "./directives/index";
import { Dictionary } from "../core/index";
import { AppDateAdapter, APP_DATE_FORMATS } from "./date.adapter";

/**
 * Font Awesome icons
 */
export const FA_ICONS: Dictionary<IconDefinition> = {
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
  declarations: [ConvertTimePipe, TruncatePipe, HighlightSearch, OrderByPipe, HighlightDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
  ],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ConvertTimePipe,
    TruncatePipe,
    HighlightSearch,
    OrderByPipe,
    HighlightDirective,
  ],
})
export class SharedModule {}
