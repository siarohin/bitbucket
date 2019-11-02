import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import last from "lodash/last";

import { FA_ICONS, IconDefinition } from "../../shared/index";
import { CourseItemModel } from "../../core/index";

/**
 * Font Awesome icons from shared module
 */
const { faPlus } = FA_ICONS;

/**
 * Simple component that contains list of course's items
 */
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent {
  private coursesListBF: Array<CourseItemModel>;

  /**
   * Last course item
   */
  public lastItem: CourseItemModel;

  /**
   * Fontawesome icons
   */
  public faPlus: IconDefinition = faPlus;

  /**
   * Set course items array
   */
  @Input()
  public set coursesList(list: Array<CourseItemModel>) {
    this.coursesListBF = list;
    this.lastItem = last(list);
  }

  /**
   * Get course items array
   */
  public get coursesList(): Array<CourseItemModel> {
    return this.coursesListBF;
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
}
