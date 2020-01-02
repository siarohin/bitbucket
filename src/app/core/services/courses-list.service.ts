import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of as observableOf, BehaviorSubject } from "rxjs";
import { catchError, concatMap, switchMap, tap } from "rxjs/operators";

import { ServicesModule } from "./services.module";
import { CourseItemModel, CoursesPerPageModel } from "./models/index";
import { CoursesAPI } from "./courses-list.config";
import { COURSES_PER_PAGE } from "../constants";
import { CoursesFacade } from "../store/courses/courses.facade";

/**
 * Courses list service
 */
@Injectable({
  providedIn: ServicesModule,
})
export class CoursesListService {
  private http: HttpClient;
  private coursesUrl: string;
  private coursesPerPage: CoursesPerPageModel = COURSES_PER_PAGE;
  private shouldPreventProcess = false;
  private coursesPerPageSubj: BehaviorSubject<CoursesPerPageModel> = new BehaviorSubject(COURSES_PER_PAGE);
  private coursesFacade: CoursesFacade;

  constructor(http: HttpClient, @Inject(CoursesAPI) coursesUrl: string, coursesFacade: CoursesFacade) {
    this.http = http;
    this.coursesUrl = coursesUrl;
    this.coursesFacade = coursesFacade;
  }

  /**
   * Get courses list
   * param {{ boolean }} set queryParams
   * return {{ Observable<Array<CourseItemModel>> }}
   */
  public getCoursesList(isLimited: boolean = true): Observable<Array<CourseItemModel>> {
    return this.coursesPerPageSubj.asObservable().pipe(
      switchMap(coursesPerPage => {
        const queryParams: any = isLimited
          ? { start: `${coursesPerPage.start}`, count: `${coursesPerPage.count}` }
          : undefined;
        return this.http
          .get<Array<CourseItemModel>>(this.coursesUrl, {
            params: queryParams,
          })
          .pipe(
            tap(coursesList => {
              if (isLimited) {
                this.shouldPreventProcess = coursesList.length !== this.coursesPerPage.count;
                this.coursesFacade.updateCoursesLength({ valid: !this.shouldPreventProcess });
              }
            }),
            catchError(() => observableOf([])),
          );
      }),
    );
  }

  /**
   * Create course item
   * param {{ CourseItemModel }}
   * return Observable<Array<CourseItemModel>
   */
  public createCourseItem(courseItem: CourseItemModel): Observable<Array<CourseItemModel>> {
    const url = this.coursesUrl;
    const body = JSON.stringify(courseItem);
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http.post<CourseItemModel>(url, body, options).pipe(
      concatMap(() => this.getCoursesList()),
      catchError(() => observableOf(undefined)),
    );
  }

  /**
   * Get course item by id
   * param {{ number }}
   * return {{ Observable<CourseItemModel> }}
   */
  public getCourseItem(id: number): Observable<CourseItemModel> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<CourseItemModel>(url).pipe(catchError(() => observableOf(undefined)));
  }

  /**
   * Update course item
   * param {{ CourseItemModel }}
   * return {{ Observable<Array<CourseItemModel> }}
   */
  public updateCourseItem(courseItem: CourseItemModel): Observable<Array<CourseItemModel>> {
    const url = `${this.coursesUrl}/${courseItem.id}`;
    const body: string = JSON.stringify(courseItem);
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.patch<CourseItemModel>(url, body, options).pipe(
      concatMap(() => this.getCoursesList()),
      catchError(() => observableOf(undefined)),
    );
  }

  /**
   * Remove course item
   * param {{ number }}
   * return {{ Observable<Array<CourseItemModel>> }}
   */
  public removeCourseItem(courseItem: CourseItemModel): Observable<Array<CourseItemModel>> {
    const url = `${this.coursesUrl}/${courseItem.id}`;
    return this.http.delete(url).pipe(concatMap(() => this.getCoursesList()));
  }

  /**
   * Load more courses
   */
  public loadMoreCourses(): void {
    if (!this.shouldPreventProcess) {
      this.coursesPerPage = { start: this.coursesPerPage.start, count: 2 * this.coursesPerPage.count };
      this.coursesPerPageSubj.next(this.coursesPerPage);
    }
  }

  /**
   * Search courses
   */
  public searchCourses(value: string): Observable<Array<CourseItemModel>> {
    return this.http
      .get<Array<CourseItemModel>>(this.coursesUrl, {
        params: { textFragment: value },
      })
      .pipe(catchError(() => observableOf([])));
  }
}
