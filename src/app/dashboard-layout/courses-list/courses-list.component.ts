import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { publishReplay, refCount, map, switchMap, tap } from "rxjs/operators";
import isNil from "lodash/isNil";
import assign from "lodash/assign";
import last from "lodash/last";

import { FA_ICONS, IconDefinition, OrderByPipe, AutoUnsubscribe } from "../../shared/index";
import {
  CourseItemModel,
  CoursesListService,
  DialogParamsModel,
  DialogAction,
  Dictionary,
} from "../../core/index";
import { DeleteCourseComponent } from "./delete-course/index";
import { AddCourseComponent } from "./add-course/index";

/**
 * Font Awesome icons from shared module
 */
const { faPlus } = FA_ICONS;

/**
 * Default sort keys for sortBy directive
 */
export const SORT_PARAMETER: Dictionary<keyof CourseItemModel> = {
  valid: "name",
  invalid: "date",
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
  private coursesListService: CoursesListService;
  private orderBy: OrderByPipe;
  private router: Router;
  private subscription: Subscription;

  /**
   * Searching value from form
   */
  public formValue: string;

  /**
   * Hide load course button
   */
  public hideLoadButton: boolean;

  /**
   * Modal dialog
   */
  public dialog: MatDialog;

  /**
   * Array from course items
   */
  public coursesList$: Observable<Array<CourseItemModel>>;

  /**
   * Fontawesome icons
   */
  public faPlus: IconDefinition = faPlus;

  constructor(
    orderBy: OrderByPipe,
    coursesListService: CoursesListService,
    dialog: MatDialog,
    router: Router,
  ) {
    this.orderBy = orderBy;
    this.coursesListService = coursesListService;
    this.dialog = dialog;
    this.router = router;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.getCoursesList();
    this.subscription = this.coursesListService.hideLoadButton$.subscribe(
      hideLoadButton => (this.hideLoadButton = hideLoadButton),
    );
  }

  /**
   * On load button click
   */
  public onLoad(): void {
    this.coursesListService.loadMoreCourses();
  }

  /**
   * On show course page
   */
  public onShowCourse(courseId: number): void {
    this.router.navigate(["courses", courseId]);
  }

  /**
   * On remove button click
   */
  public onRemoveCourse(courseId: number): void {
    const name = "Do you really want to delete this course?";
    const data: CourseItemModel = { id: courseId, name };
    const params: DialogParamsModel = { action: DialogAction.Remove, data };
    this.openDialog(params);
  }

  /**
   * On add course button click
   */
  public onAddCourse(): void {
    const name = "New course";
    const data: CourseItemModel = { name };
    const params: DialogParamsModel = { action: DialogAction.Create, data };
    this.openDialog(params);
  }

  /**
   * On edit course button click
   */
  public onEditCourse(course: CourseItemModel): void {
    const data: CourseItemModel = { ...course };
    const params: DialogParamsModel = { action: DialogAction.Edit, data };
    this.openDialog(params);
  }

  /**
   * Search courses
   */
  public onSearchCourses(value: string): void {
    this.formValue = value;
    const isFormReq = true;
    this.hideLoadButton = true;
    !!value.length ? this.searchCourse(value, isFormReq) : this.getCoursesList();
  }

  private getCoursesList(): void {
    this.coursesList$ = this.coursesListService.getCoursesList().pipe(
      map(coursesList => this.orderByCoursesList(coursesList)),
      publishReplay(1),
      refCount(),
    );
  }

  private searchCourse(value: string, isFormReq: boolean): void {
    this.coursesList$ = this.coursesListService.searchCourses(value).pipe(
      map(coursesList => this.orderByCoursesList(coursesList, isFormReq)),
      tap(console.log),
      publishReplay(1),
      refCount(),
    );
  }

  private orderByCoursesList(
    coursesList: Array<CourseItemModel>,
    isFormReq: boolean = false,
  ): Array<CourseItemModel> {
    const parameter: keyof CourseItemModel = !isNil(isFormReq)
      ? SORT_PARAMETER.valid
      : SORT_PARAMETER.invalid;
    return this.orderBy.transform(coursesList, parameter);
  }

  private openDialog(params: DialogParamsModel): void {
    const component: typeof DeleteCourseComponent | typeof AddCourseComponent =
      params.action === DialogAction.Remove ? DeleteCourseComponent : AddCourseComponent;
    const dialogRef = this.dialog.open(component, { disableClose: true, data: params });

    dialogRef.afterClosed().subscribe((param: DialogParamsModel) => {
      const isValid: boolean = !isNil(param);

      if (!isValid) {
        return;
      }

      const { action, data } = param;

      switch (action) {
        case DialogAction.Remove:
          this.removeCourseItem({ ...data });
          break;

        case DialogAction.Create:
          this.createCourseItem({ ...data });
          break;

        case DialogAction.Edit:
          this.updateCourseItem({ ...data });
          break;

        default:
          break;
      }
    });
  }

  private removeCourseItem(courseItem: CourseItemModel): void {
    this.coursesList$ = this.coursesListService.removeCourseItem(courseItem).pipe(
      map(coursesList => this.orderByCoursesList(coursesList)),
      publishReplay(1),
      refCount(),
    );
  }

  private updateCourseItem(courseItem: CourseItemModel): void {
    this.coursesList$ = this.coursesListService.updateCourseItem(courseItem).pipe(
      map(coursesList => this.orderByCoursesList(coursesList)),
      publishReplay(1),
      refCount(),
    );
  }

  private createCourseItem(courseItem: CourseItemModel): void {
    // skip limit for checking all courses
    const coursesLimit = false;

    this.coursesList$ = this.coursesListService.getCoursesList(coursesLimit).pipe(
      switchMap(coursesList => {
        const coursesById: Array<CourseItemModel> = this.orderBy.transform(coursesList, "id");
        const id: number = !isNil(last(coursesById)) ? last(coursesById).id + 1 : 1;
        const course: CourseItemModel = assign({}, courseItem, { id });
        return this.coursesListService.createCourseItem(course);
      }),
      map(coursesList => this.orderByCoursesList(coursesList)),
      publishReplay(1),
      refCount(),
    );
  }
}
