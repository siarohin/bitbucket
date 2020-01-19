import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { publishReplay, refCount } from "rxjs/operators";
import isNil from "lodash/isNil";

import { FA_ICONS, IconDefinition } from "../../shared/index";
import {
  CourseItemModel,
  DialogParamsModel,
  DialogAction,
  CoursesFacade,
  AuthorsFacade,
} from "../../core/index";
import { DeleteCourseComponent } from "./delete-course/index";
import { AddCourseComponent } from "./add-course/index";
/**
 * Font Awesome icons from shared module
 */
const { faPlus } = FA_ICONS;

/**
 * Smart component that contains list of course's items
 */
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent implements OnInit {
  private coursesFacade: CoursesFacade;
  private authorsFacade: AuthorsFacade;
  private router: Router;

  /**
   * Searching value from form
   */
  public formValue: string;

  /**
   * Load button
   */
  public loadButton$: Observable<boolean>;

  /**
   * Modal dialog
   */
  public dialog: MatDialog;

  /**
   * Array from course items
   */
  public coursesList$: Observable<ReadonlyArray<CourseItemModel>>;

  /**
   * Fontawesome icons
   */
  public faPlus: IconDefinition = faPlus;

  constructor(dialog: MatDialog, router: Router, coursesFacade: CoursesFacade, authorsFacade: AuthorsFacade) {
    this.dialog = dialog;
    this.router = router;
    this.coursesFacade = coursesFacade;
    this.authorsFacade = authorsFacade;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.coursesFacade.getCourses();
    this.authorsFacade.getAuthors();

    this.coursesList$ = this.coursesFacade.courses$.pipe(publishReplay(1), refCount());
    this.loadButton$ = this.coursesFacade.isCoursesLength$.pipe(publishReplay(1), refCount());
  }

  /**
   * On load button click
   */
  public onLoad(): void {
    this.coursesFacade.loadMoreCourses();
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
    !!value.length ? this.coursesFacade.searchCourses({ value }) : this.coursesFacade.getCourses();
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
          this.coursesFacade.deleteCourse({ course: { ...data } });
          break;

        case DialogAction.Create:
          this.coursesFacade.createCourse({ course: { ...data } });
          break;

        case DialogAction.Edit:
          this.coursesFacade.updateCourse({ course: { ...data } });
          break;

        default:
          break;
      }
    });
  }
}
