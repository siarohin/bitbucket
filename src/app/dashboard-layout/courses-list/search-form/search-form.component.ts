import { Component, Output, ChangeDetectionStrategy, Inject } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";

import { FA_ICONS, IconDefinition } from "../../../shared/index";
import { DEBOUNCE_TIME } from "../../../core/index";

/**
 * Font Awesome icons from shared module
 */
const { faSearch } = FA_ICONS;

/**
 * Number of input's chars that start calling API
 */
const MIN_CHARS = 3;

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
  private fb: FormBuilder;

  /**
   * Fontawesome icons
   */
  public faSearch: IconDefinition = faSearch;

  /**
   * Form group
   */
  public searchForm: FormGroup;

  /**
   * Observable of users' input value
   */
  @Output()
  public search$: Observable<string>;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.fb = fb;
    this.searchForm = this.fb.group({
      search: [undefined],
    });

    this.search$ = this.search.valueChanges.pipe(
      distinctUntilChanged((prevValue, currValue) => prevValue.trim() === currValue.trim()),
      filter(value => !value.length || value.trim().length >= MIN_CHARS),
      debounceTime(DEBOUNCE_TIME),
    );
  }

  /**
   * `search` abstract control
   */
  private get search(): AbstractControl {
    return this.searchForm.get("search");
  }
}
