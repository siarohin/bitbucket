import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { publishReplay, refCount, map } from "rxjs/operators";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

import { FA_ICONS, IconDefinition, OrderByPipe } from "../../shared/index";
import { CourseItemModel, CoursesListService } from "../../core/index";
import { DialogOverviewComponent, DialogData } from "./dialog-overview/index";

/**
 * Font Awesome icons from shared module
 */
const { faPlus } = FA_ICONS;

/**
 * Default sort keys for sortBy directive
 */
export const SORT_PARAMETER: {
  [key: string]: keyof CourseItemModel;
} = {
  valid: "title",
  invalid: "creationDate",
};

/**
 * Smart component that contains list of course's items
 */
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
  providers: [OrderByPipe],
})
export class CoursesListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private coursesListService: CoursesListService;
  private orderBy: OrderByPipe;
  private inputValueBF: string;

  /**
   * Modal dialog
   */
  public dialog: MatDialog;

  /**
   * Array from course items
   */
  public coursesList: Array<CourseItemModel>;

  /**
   * Fontawesome icons
   */
  public faPlus: IconDefinition = faPlus;

  /**
   * Set user's input value
   * Param {{ string }}
   */
  @Input()
  public set inputValue(value: string) {
    this.inputValueBF = value;
    this.coursesList = this.orderByCoursesList();
  }

  /**
   * Get user's input value
   * Return {{ string }}
   */
  public get inputValue(): string {
    return this.inputValueBF;
  }

  constructor(orderBy: OrderByPipe, coursesListService: CoursesListService, dialog: MatDialog) {
    this.orderBy = orderBy;
    this.coursesListService = coursesListService;
    this.dialog = dialog;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.subscription = this.coursesListService
      .getCoursesList()
      .pipe(
        map(coursesList => this.orderByCoursesList(coursesList)),
        publishReplay(1),
        refCount(),
      )
      .subscribe(coursesList => (this.coursesList = coursesList));
  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * On load button click
   */
  public onLoadBtnClick(): void {
    console.log("Button 'Load' was clicked");
  }

  /**
   * On remove button click
   */
  public onRemoveCourse(courseId: number): void {
    this.openDialog(courseId);
  }

  private orderByCoursesList(coursesList: Array<CourseItemModel> = this.coursesList): Array<CourseItemModel> {
    const parameter: keyof CourseItemModel = !isEmpty(this.inputValue)
      ? SORT_PARAMETER.valid
      : SORT_PARAMETER.invalid;
    return this.orderBy.transform(coursesList, parameter);
  }

  private openDialog(courseId: number): void {
    const dialogData: DialogData = {
      title: "Do you really want to delete this course?",
      id: courseId,
    };
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: "30rem",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((data: DialogData) => {
      if (!isNil(data) && !isNil(data.id)) {
        const { id } = data;
        this.coursesListService.removeCourseItem(id);
      }
    });
  }
}
