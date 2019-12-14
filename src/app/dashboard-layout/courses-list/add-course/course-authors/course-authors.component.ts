import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import isEmpty from "lodash/isEmpty";

import { KEY_KODES, AuthorsModel, DEFAULT_AUTHOR } from "../../../../core/index";

/**
 * Simple component that represents course's authors creation
 */
@Component({
  selector: "app-course-authors",
  templateUrl: "./course-authors.component.html",
  styleUrls: ["./course-authors.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseAuthorsComponent {
  private authorsBF: Array<AuthorsModel>;

  /**
   * Set authors
   * parram {{ Array<AuthorsModel> }}
   */
  @Input()
  public set authors(value: Array<AuthorsModel>) {
    if (isEmpty(value)) {
      this.authorsBF = [DEFAULT_AUTHOR];
      return;
    }

    this.authorsBF = value;
  }

  /**
   * Get authors
   * return {{ Array<AuthorsModel> }}
   */
  public get authors(): Array<AuthorsModel> {
    return this.authorsBF;
  }

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

  /**
   * The list of key codes that will trigger a chipEnd event
   */
  public separatorKeysCodes: Array<number> = KEY_KODES;

  /**
   * Event emitter for authors changes
   */
  @Output()
  public changeAuthors: EventEmitter<Array<AuthorsModel>> = new EventEmitter();

  /**
   * Add author to list
   * param {{ MatChipInputEvent }}
   */
  public add(event: MatChipInputEvent): void {
    const input: HTMLInputElement = event.input;
    const value: string = event.value || "";

    // Add author
    if (value.trim()) {
      const author: Array<string> = value.split(" ");
      const [name, lastName] = author;
      const authors: Array<AuthorsModel> = [
        ...this.authors,
        { id: undefined, name: name ? name.trim() : "", lastName: lastName ? lastName.trim() : "" },
      ];
      this.updateAuthors(authors);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  /**
   * Remove author from list
   * param {{ Dictionary<string> }}
   */
  public remove(author: AuthorsModel): void {
    const authors = this.authors.filter(param => author.name !== param.name);
    this.updateAuthors(authors);
  }

  private updateAuthors(authors: Array<AuthorsModel>): void {
    this.authors = [...authors];
    this.changeAuthors.emit(authors);
  }
}
