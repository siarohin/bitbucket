import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { publishReplay, refCount } from "rxjs/operators";

import { CourseItemModel } from "./models/index";
import { DEFAULT_CONFIG } from "./courses.config";

/**
 * Courses list service
 */
@Injectable()
export class CoursesListService {
  private coursesList: Array<CourseItemModel> = DEFAULT_CONFIG;
  private coursesListSubj: BehaviorSubject<Array<CourseItemModel>> = new BehaviorSubject(this.coursesList);
  private coursesList$: Observable<Array<CourseItemModel>>;

  constructor() {
    this.coursesList$ = this.coursesListSubj.asObservable().pipe(publishReplay(1), refCount());
  }

  /**
   * Get courses list
   * return {{ Observable<Array<CourseItemModel>> }}
   */
  public getCoursesList(): Observable<Array<CourseItemModel>> {
    return this.coursesList$;
  }

  /**
   * Create course item
   * param {{ CourseItemModel }}
   */
  public createCourseItem(couseItem: CourseItemModel): void {
    this.coursesList = [...this.coursesList, couseItem];
    this.coursesListSubj.next(this.coursesList);
  }

  /**
   * Get course item by id
   * param {{ number }}
   * return {{ CourseItemModel }}
   */
  public getCourseItem(id: number): CourseItemModel {
    const courseItem: CourseItemModel = this.coursesList.find(item => item.id === id);
    return courseItem;
  }

  /**
   * Update course item
   * param {{ CourseItemModel }}
   */
  public updateCourseItem(couseItem: CourseItemModel): void {
    const indexToUpdate: number = this.coursesList.findIndex(item => item.id === couseItem.id);
    this.coursesList = this.coursesList.splice(indexToUpdate, 1, couseItem);
    this.coursesListSubj.next(this.coursesList);
  }

  /**
   * Remove course item
   * param {{ number }}
   */
  public removeCourseItem(id: number): void {
    this.coursesList = this.coursesList.filter(course => course.id !== id);
    this.coursesListSubj.next(this.coursesList);
  }
}
