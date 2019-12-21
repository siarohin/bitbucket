import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, of as observableOf } from "rxjs";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import isNil from "lodash/isNil";

import { StorageService } from "./storage.service";
import { UserAuthModel, TokenRequestModel, AuthenticationModel } from "./models/index";
import { ServicesModule } from "./services.module";
import { UsersAPI } from "./auth.config";

/**
 * Constant for token name
 */
const TOKEN = "token";

/**
 * Constant for post requests
 */
enum AuthApi {
  login = "login",
  user = "userinfo",
}

/**
 * Authentication promise service
 */
@Injectable({
  providedIn: ServicesModule,
})
export class AuthService {
  private http: HttpClient;
  private usersUrl: string;
  private storageService: StorageService;
  private isLoggedOutSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(storageService: StorageService, http: HttpClient, @Inject(UsersAPI) usersUrl: string) {
    this.http = http;
    this.usersUrl = usersUrl;
    this.storageService = storageService;
  }

  /**
   * Authenticate user
   */
  public authenticate(auth: AuthenticationModel): Observable<UserAuthModel> {
    const { login, password } = auth;
    const url = `${this.usersUrl}/${AuthApi.login}`;
    const body: string = JSON.stringify({
      login,
      password,
    });
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http.post<TokenRequestModel>(url, body, options).pipe(
      switchMap((response: TokenRequestModel) => {
        const { token } = response;
        this.setTokenToStorage(token);

        return this.getUser(token).pipe(
          tap(() => this.isLoggedOutSubj.next(false)),
          catchError(() => observableOf(undefined)),
        );
      }),
    );
  }

  /**
   * Logout user
   */
  public logout(): void {
    this.deleteTokenFromStorage();
    this.isLoggedOutSubj.next(true);
  }

  /**
   * Return isAuthenticated
   * return {{ boolean }}
   */
  public isAuthenticated(): Observable<boolean> {
    const isAuthenticatedToken: boolean = !isNil(this.getTokenFromStorage());

    return observableOf(isAuthenticatedToken);
  }

  /**
   * Return token
   */
  public getToken(): string {
    return this.getTokenFromStorage();
  }

  public get user$(): Observable<UserAuthModel> {
    return this.isLoggedOutSubj.asObservable().pipe(
      switchMap(isLoggedOut => {
        const token: string = this.getTokenFromStorage();

        if (isLoggedOut || !token) {
          return observableOf(undefined);
        } else {
          return this.getUser();
        }
      }),
    );
  }

  private getUser(token: string = this.getTokenFromStorage()): Observable<UserAuthModel> {
    const url = `${this.usersUrl}/${AuthApi.user}`;
    const body: string = JSON.stringify({
      token,
    });
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http.post<UserAuthModel>(url, body, options).pipe(
      map(user => user as UserAuthModel),
      catchError(err => {
        this.handleError(err);
        return throwError("Please try again later");
      }),
    );
  }

  /**
   * Get token from storage
   */
  private getTokenFromStorage(): string {
    return this.storageService.getItem(TOKEN);
  }

  /**
   * Set token to storage
   */
  private setTokenToStorage(token: string): void {
    this.storageService.setItem(TOKEN, token);
  }

  /**
   * delete token from storage
   */
  private deleteTokenFromStorage(): void {
    this.storageService.removeItem([TOKEN]);
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error("An error occurred:", err.error.message);
    } else {
      console.error(err.error);
    }
  }
}
