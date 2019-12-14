import { Component, Output, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil, filter } from "rxjs/operators";

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
export class SearchFormComponent implements OnDestroy {
  private destroySubj: Subject<boolean> = new Subject();
  private inputValueSubj: Subject<string> = new Subject();

  /**
   * Fontawesome icons
   */
  public faSearch: IconDefinition = faSearch;

  /**
   * Observable of users' input value
   */
  @Output()
  public search$: Observable<string>;

  constructor() {
    // Using an operator like takeUntil instead
    // of manually unsubscribing will also complete
    // the observable, triggering any completion event
    // on the observable.
    this.search$ = this.inputValueSubj.asObservable().pipe(
      distinctUntilChanged((prevValue, currValue) => prevValue.trim() === currValue.trim()),
      filter(value => !value.length || value.trim().length >= MIN_CHARS),
      debounceTime(DEBOUNCE_TIME),
      takeUntil(this.destroySubj),
    );
  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.destroySubj.next(true);
    this.destroySubj.unsubscribe();
  }

  /**
   * On search button click
   */
  public onSearch(value: string): void {
    this.inputValueSubj.next(value);
  }
}
