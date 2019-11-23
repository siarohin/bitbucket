import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription, BehaviorSubject } from "rxjs";

import { AutoUnsubscribe } from "../../../../shared/index";

/**
 * Simple component that represents course's date creation
 */
@AutoUnsubscribe()
@Component({
  selector: "app-creation-course-date",
  templateUrl: "./creation-course-date.component.html",
  styleUrls: ["./creation-course-date.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreationCourseDateComponent implements OnInit {
  private currentDate: string = new Date().toISOString();
  private changeDateSubj: BehaviorSubject<string> = new BehaviorSubject(this.currentDate);
  private isValid = true;
  private subscription: Subscription;

  /**
   * serializedDate
   */
  public serializedDate: FormControl = new FormControl(new Date().toISOString());

  /**
   * Event emitter for course's date changes
   */
  @Output()
  public changeDate: EventEmitter<string> = new EventEmitter();

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.subscription = this.changeDateSubj
      .asObservable()
      .subscribe(changeDate => this.changeDate.emit(changeDate));
  }

  /**
   * On date keyUp changes
   */
  public onKeyUp(): void {
    this.isValid = this.serializedDate.valid;
  }

  /**
   * On date input changes
   */
  public onDateChange(): void {
    if (this.isValid) {
      const date: string = this.serializedDate.value;
      this.changeDateSubj.next(date);
    }
  }
}
