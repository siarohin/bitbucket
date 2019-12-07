import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of as observableOf, BehaviorSubject } from "rxjs";
import { catchError, retry, concatMap, switchMap, map, delay } from "rxjs/operators";
import isNaN from "lodash/isNaN";

import { CourseItemModel, Dictionary } from "./models/index";
import { CoursesAPI } from "./courses-list.config";
import { ServicesModule } from "./services.module";
import { DELAY_TIME, RETRY_REQ, COURSES_PER_PAGE } from "../constants";

/**
 * Courses list service
 */
@Injectable({
  providedIn: ServicesModule,
})
export class CoursesListService {
  private http: HttpClient;
  private coursesUrl: string;
  private coursesPerPage: number = COURSES_PER_PAGE;
  private coursesLength: number;
  private shouldPreventProcess = false;
  private coursesPerPageSubj: BehaviorSubject<number> = new BehaviorSubject(COURSES_PER_PAGE);
  private hideLoadButtonSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Hide load course button
   * Observable<boolean>
   */
  public hideLoadButton$: Observable<boolean>;

  constructor(http: HttpClient, @Inject(CoursesAPI) coursesUrl: string) {
    this.http = http;
    this.coursesUrl = coursesUrl;
    this.hideLoadButton$ = this.hideLoadButtonSubj.asObservable();
  }

  /**
   * Get courses list
   * param {{ boolean }} set queryParams
   * return {{ Observable<Array<CourseItemModel>> }}
   */
  public getCoursesList(isLimited: boolean = true): Observable<Array<CourseItemModel>> {
    return this.coursesPerPageSubj.asObservable().pipe(
      delay(DELAY_TIME),
      switchMap(coursesPerPage => {
        const queryParams: Dictionary<string> = isLimited ? { _limit: `${coursesPerPage}` } : undefined;
        return this.http
          .get<Array<CourseItemModel>>(this.coursesUrl, {
            params: queryParams,
            observe: "response",
          })
          .pipe(
            map(res => {
              const coursesLength: string = res.headers.get("X-Total-Count");
              this.coursesLength = !isNaN(Number(coursesLength)) ? Number(coursesLength) : 0;
              this.shouldPreventProcess = this.coursesPerPage >= this.coursesLength;
              this.hideLoadButtonSubj.next(this.shouldPreventProcess);

              return res.body;
            }),
            retry(RETRY_REQ),
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
      delay(DELAY_TIME),
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
    return this.http.get<CourseItemModel>(url).pipe(
      retry(RETRY_REQ),
      catchError(() => observableOf(undefined)),
    );
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
    return this.http.put<CourseItemModel>(url, body, options).pipe(
      delay(DELAY_TIME),
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
    return this.http.delete(url).pipe(
      delay(DELAY_TIME),
      concatMap(() => this.getCoursesList()),
    );
  }

  /**
   * Load more courses
   */
  public loadMoreCourses(): void {
    if (this.shouldPreventProcess) {
      return;
    }

    this.coursesPerPage = this.coursesPerPage + COURSES_PER_PAGE;
    this.coursesPerPageSubj.next(this.coursesPerPage);
  }

  /**
   * Search courses
   */
  public searchCourses(value: string): Observable<Array<CourseItemModel>> {
    return this.http
      .get<Array<CourseItemModel>>(this.coursesUrl, {
        params: { q: value },
      })
      .pipe(
        delay(DELAY_TIME),
        retry(RETRY_REQ),
        catchError(() => observableOf([])),
      );
  }
}
