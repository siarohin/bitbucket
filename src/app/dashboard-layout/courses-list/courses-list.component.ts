import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";

import {
  FA_ICONS,
  IconDefinition,
  OrderByPipe,
} from "../../shared/index";
import { CourseItemModel } from "../../core/index";

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
 * Simple component that contains list of course's items
 */
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
  providers: [OrderByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent {
  private orderBy: OrderByPipe;
  private coursesListBF: Array<CourseItemModel>;
  private inputValueBF: string;

  /**
   * Fontawesome icons
   */
  public faPlus: IconDefinition = faPlus;

  /**
   * Set courses list
   * Param {{ Array<CourseItemModel> }}
   */
  @Input()
  public set coursesList(value: Array<CourseItemModel>) {
    this.coursesListBF = value;
  }

  /**
   * Get courses list
   * Return {{ Array<CourseItemModel> }}
   */
  public get coursesList(): Array<CourseItemModel> {
    return this.coursesListBF;
  }

  /**
   * Set user's input value
   * Param {{ string }}
   */
  @Input()
  public set inputValue(value: string) {
    this.inputValueBF = value;
    this.orderByCoursesList();
  }

  /**
   * Get user's input value
   * Return {{ string }}
   */
  public get inputValue(): string {
    return this.inputValueBF;
  }

  constructor(orderBy: OrderByPipe) {
    this.orderBy = orderBy;
  }

  /**
   * On load button click
   */
  public onLoadBtnClick(): void {
    console.log("Button 'Load' was clicked");
  }

  /**
   * Delete course item on button click
   */
  public onDeleteCourse(courseId: number): void {
    console.log(courseId);
  }

  private orderByCoursesList(): void {
    const parameter: keyof CourseItemModel = !isEmpty(this.inputValue)
      ? SORT_PARAMETER.valid
      : SORT_PARAMETER.invalid;

    const coursesList: Array<
      CourseItemModel
    > = this.orderBy.transform(this.coursesList, parameter);

    this.coursesList = coursesList;
  }
}
