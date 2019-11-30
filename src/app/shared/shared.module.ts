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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatChipsModule } from "@angular/material/chips";
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

import { ConvertTimePipe, TruncatePipe, OrderByPipe } from "./pipes/index";
import { HighlightDirective } from "./directives/index";
import { Dictionary } from "../core/index";

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
  declarations: [ConvertTimePipe, TruncatePipe, OrderByPipe, HighlightDirective],
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
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MatNativeDateModule],
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
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ConvertTimePipe,
    TruncatePipe,
    OrderByPipe,
    HighlightDirective,
  ],
})
export class SharedModule {}
