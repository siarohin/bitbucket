import { CourseItemModel } from "./course-item.model";

/**
 * Dialog params model on delete course
 */
export interface DialogParamsModel {
  action: string;
  data: CourseItemModel;
}
