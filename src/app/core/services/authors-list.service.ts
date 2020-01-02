import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of as observableOf } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthorsModel } from "./models/index";
import { ServicesModule } from "./services.module";
import { AuthorsAPI } from "./authors-list.config";

/**
 * Authors' service
 */
@Injectable({
  providedIn: ServicesModule,
})
export class AuthorsListService {
  private http: HttpClient;
  private authorsUrl: string;

  constructor(http: HttpClient, @Inject(AuthorsAPI) authorsUrl: string) {
    this.http = http;
    this.authorsUrl = authorsUrl;
  }

  /**
   * Get authors' list
   */
  public getAuthors(): Observable<Array<AuthorsModel>> {
    return this.http.get<Array<AuthorsModel>>(this.authorsUrl).pipe(catchError(() => observableOf([])));
  }
}
