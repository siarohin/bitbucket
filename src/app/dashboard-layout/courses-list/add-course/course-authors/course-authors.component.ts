import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  forwardRef,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import {
  FormBuilder,
  FormGroup,
  ControlValueAccessor,
  Validator,
  ValidationErrors,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validators,
} from "@angular/forms";
import isNil from "lodash/isNil";
import differenceBy from "lodash/differenceBy";
import { Observable } from "rxjs";
import { map, switchMap, debounceTime, startWith } from "rxjs/operators";

import { AuthorsModel, Dictionary, AuthorsFacade, DEBOUNCE_TIME } from "../../../../core/index";

/**
 * Simple component that represents course's authors creation
 */
@Component({
  selector: "app-course-authors",
  templateUrl: "./course-authors.component.html",
  styleUrls: ["./course-authors.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseAuthorsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseAuthorsComponent),
      multi: true,
    },
  ],
})
export class CourseAuthorsComponent implements OnInit, ControlValueAccessor, Validator {
  private fb: FormBuilder;
  private authorsFacade: AuthorsFacade;
  private onTouched: () => void;
  private onChange: (_: any) => void;

  /**
   * ElementRef chipInput
   */
  @ViewChild("chipInput", { static: false })
  public chipInput: ElementRef<HTMLInputElement>;

  /**
   * Authors
   */
  public authors: Array<AuthorsModel> = [];

  /**
   * Authors on autocomplete
   */
  public filteredOptions$: Observable<Array<AuthorsModel>>;

  /**
   * Duration' course form
   */
  public authorsCourseForm: FormGroup;

  /**
   * Whether or not this chip list is selectable
   */
  public isSelectable = true;

  /**
   * Whether or not this chip list is removable
   */
  public isRemovable = true;

  /**
   * Whether or not the chipEnd event will be emitted when the input is blurred
   */
  public isAddOnBlur = true;

  constructor(@Inject(FormBuilder) fb: FormBuilder, authorsFacade: AuthorsFacade) {
    this.fb = fb;
    this.onTouched = () => {};
    this.onChange = (_: any) => {};
    this.authorsFacade = authorsFacade;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.authorsCourseForm = this.fb.group({
      authors: [[], [Validators.required]],
      userInput: [""],
    });

    this.filteredOptions$ = this.authorsCourseForm.get("userInput").valueChanges.pipe(
      startWith([]),
      debounceTime(DEBOUNCE_TIME),
      switchMap(value => this.filterAuthors(value)),
    );
  }

  /**
   * This method is called by the forms API to write to the view when
   * programmatic changes from model to view are requested.
   */
  public writeValue(value: Dictionary<Array<AuthorsModel>>): void {
    const valid: boolean = !isNil(value) && !isNil(value.authors);

    if (valid) {
      this.authors = value.authors;
      this.authorsCourseForm.patchValue({ authors: this.authors });
    }
  }

  /**
   * Registers a callback function that is called when the control's value
   * changes in the UI.
   */
  public registerOnChange(fn: any): void {
    this.authorsCourseForm.valueChanges.subscribe(fn);
  }

  /**
   * Registers a callback function is called by the forms API on initialization
   * to update the form model on blur.
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Function that is called by the forms API when the control status changes
   * to or from 'DISABLED'. Depending on the status, it enables or disables
   * the appropriate DOM element.
   */
  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.authorsCourseForm.disable() : this.authorsCourseForm.enable();
  }

  /**
   * Validate
   */
  public validate(): ValidationErrors | null {
    return this.authorsCourseForm.valid
      ? null
      : {
          invalidForm: { valid: false },
        };
  }

  /**
   * Add author to list
   * param {{ MatAutocompleteSelectedEvent }}
   */
  public add(event: MatAutocompleteSelectedEvent): void {
    const value: AuthorsModel = event.option.value || undefined;

    if (isNil(value)) {
      return;
    }

    const author: Array<string> = value.name.split(" ");
    const [name, lastName] = author;
    const authors: Array<AuthorsModel> = [
      ...this.authors,
      {
        id: value.id,
        name: name.trim(),
        lastName: lastName.trim(),
      },
    ];
    this.updateAuthors(authors);
  }

  /**
   * Remove author from list
   * param {{ Dictionary<string> }}
   */
  public remove(author: AuthorsModel): void {
    const authors = this.authors.filter(param => author.id !== param.id);
    this.updateAuthors(authors);
  }

  /**
   * Filter authors
   */
  private filterAuthors(value: string | Array<AuthorsModel>): Observable<Array<AuthorsModel>> {
    return this.authorsFacade.authors$.pipe(
      map(allAuthors => differenceBy(allAuthors, this.authors, "id")),
      map((filteredAuthors: Array<AuthorsModel>) => {
        if (typeof value === "string" && value.trim().length) {
          return filteredAuthors.filter(authors => authors.name.toLowerCase().includes(value.toLowerCase()));
        } else {
          return filteredAuthors;
        }
      }),
    );
  }

  /**
   * Update authors and reset input value
   */
  private updateAuthors(authors: Array<AuthorsModel>): void {
    this.authors = [...authors];
    this.authorsCourseForm.patchValue({ authors: this.authors });

    if (this.chipInput) {
      this.chipInput.nativeElement.value = "";
    }
  }
}
