import { Component, EventEmitter, Output, ChangeDetectionStrategy } from "@angular/core";
import isEmpty from "lodash/isEmpty";

import { FA_ICONS, IconDefinition } from "../../shared/index";

/**
 * Font Awesome icons from shared module
 */
const { faSearch } = FA_ICONS;

/**
 * Simple component that represents user's search form
 */
@Component({
  selector: "app-search-form",
  templateUrl: "./search-form.component.html",
  styleUrls: ["./search-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  /**
   * Fontawesome icons
   */
  public faSearch: IconDefinition = faSearch;

  /**
   * Event emitter for search button click
   */
  @Output()
  public searchButtonClick: EventEmitter<string> = new EventEmitter();

  /**
   * On search button click
   */
  public onBtnClick(value: string): void {
    this.searchButtonClick.emit(value);
  }
}
