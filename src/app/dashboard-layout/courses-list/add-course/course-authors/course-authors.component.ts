import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { Subscription, BehaviorSubject } from "rxjs";

import { AutoUnsubscribe } from "../../../../shared/index";

/**
 * Array with default authors
 */
const AUTHORS: Array<{ [key: string]: string }> = [{ name: "John Doe" }, { name: "Yohan Smitz" }];

/**
 * Array with keyCodes
 */
const KEY_KODES: Array<number> = [ENTER, COMMA];

/**
 * Simple component that represents course's authors creation
 */
@AutoUnsubscribe()
@Component({
  selector: "app-course-authors",
  templateUrl: "./course-authors.component.html",
  styleUrls: ["./course-authors.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseAuthorsComponent implements OnInit {
  private courseAuthorsSubj: BehaviorSubject<Array<{ [key: string]: string }>> = new BehaviorSubject(AUTHORS);
  private subscription: Subscription;

  /**
   * List of authors
   */
  public authorsList: Array<{ [key: string]: string }> = AUTHORS;

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
  public changeAuthors: EventEmitter<Array<{ [key: string]: string }>> = new EventEmitter();

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.subscription = this.courseAuthorsSubj
      .asObservable()
      .subscribe(authors => this.changeAuthors.emit(authors));
  }

  /**
   * Add author to list
   * param {{ MatChipInputEvent }}
   */
  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add author
    if ((value || "").trim()) {
      const authors: Array<{ [key: string]: string }> = [...this.authorsList, { name: value.trim() }];
      this.updateAuthors(authors);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  /**
   * Remove author from list
   * param {{ { [key: string]: string } }}
   */
  public remove(author: { [key: string]: string }): void {
    const authors = this.authorsList.filter(param => author.name !== param.name);
    this.updateAuthors(authors);
  }

  private updateAuthors(authors: Array<{ [key: string]: string }>): void {
    this.authorsList = [...authors];
    this.courseAuthorsSubj.next(authors);
  }
}
