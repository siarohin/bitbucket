import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";

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
  /**
   * Fontawesome icons
   */
  public faPlus: IconDefinition = faPlus;

  /**
   * Array of course items
   */
  @Input()
  public coursesList: Array<CourseItemModel>;

  /**
   * On load button click
   */
  public onLoadBtnClick(): void {
    console.log("Button 'Load' was clicked");
  }

  /**
   * Delete button click on course item
   */
  public deleteButtonClick(courseId: number): void {
    console.log(courseId);
  }
}
