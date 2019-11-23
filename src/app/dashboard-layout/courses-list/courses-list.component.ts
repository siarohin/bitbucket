import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { publishReplay, refCount, map } from "rxjs/operators";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import last from "lodash/last";
import assign from "lodash/assign";

import { FA_ICONS, IconDefinition, OrderByPipe, AutoUnsubscribe } from "../../shared/index";
import { CourseItemModel, CoursesListService, DialogParamsModel } from "../../core/index";
import { DeleteCourseComponent } from "./delete-course/index";
import { AddCourseComponent } from "./add-course/index";

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
@AutoUnsubscribe()
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
  providers: [OrderByPipe],
})
export class CoursesListComponent implements OnInit {
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
   * On load button click
   */
  public onLoadBtnClick(): void {
    console.log("Button 'Load' was clicked");
  }

  /**
   * On remove button click
   */
  public onRemoveCourse(courseId: number): void {
    const title = "Do you really want to delete this course?";
    const data: CourseItemModel = { id: courseId, title };
    const params: DialogParamsModel = { action: "remove", data };
    this.openDialog(params);
  }

  /**
   * On add course button click
   */
  public onAddCourse(): void {
    const title = "New course";
    const data: CourseItemModel = { title };
    const params: DialogParamsModel = { action: "create", data };
    this.openDialog(params);
  }

  private orderByCoursesList(coursesList: Array<CourseItemModel> = this.coursesList): Array<CourseItemModel> {
    const parameter: keyof CourseItemModel = !isEmpty(this.inputValue)
      ? SORT_PARAMETER.valid
      : SORT_PARAMETER.invalid;
    return this.orderBy.transform(coursesList, parameter);
  }

  private openDialog(params: DialogParamsModel): void {
    const component = params.action === "remove" ? DeleteCourseComponent : AddCourseComponent;
    const dialogRef = this.dialog.open(component, { disableClose: true, data: params });

    dialogRef.afterClosed().subscribe((param: DialogParamsModel) => {
      const isValid: boolean = !isNil(param);

      if (!isValid) {
        return;
      }

      const { action, data } = param;

      if (action === "remove") {
        this.coursesListService.removeCourseItem(data.id);
      } else if (action === "create") {
        const id: number = this.createCourseId();
        const courseItem: CourseItemModel = assign({}, data, { id });
        this.coursesListService.createCourseItem(courseItem);
      }
    });
  }

  private createCourseId(): number {
    const lastCourse: CourseItemModel = last(this.orderBy.transform(this.coursesList, "id"));
    return lastCourse.id + 1;
  }
}
