import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, of as observableOf } from "rxjs";
import { publishReplay, refCount, map, catchError, switchMap, take } from "rxjs/operators";
import isNil from "lodash/isNil";

import { StorageService } from "./storage.service";
import { UserAuthModel, NameModel, TokenRequestModel, AuthenticationModel } from "./models/index";
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
  private userSubj: BehaviorSubject<UserAuthModel> = new BehaviorSubject(undefined);

  /**
   * Observable<NameModel>
   */
  public user$: Observable<NameModel>;

  constructor(storageService: StorageService, http: HttpClient, @Inject(UsersAPI) usersUrl: string) {
    this.http = http;
    this.usersUrl = usersUrl;
    this.storageService = storageService;
    this.user$ = this.userSubj.asObservable().pipe(
      map(user => (isNil(user) ? undefined : user.name)),
      publishReplay(1),
      refCount(),
    );
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
        return this.getUser(token);
      }),
      catchError(() => observableOf(undefined)),
    );
  }

  /**
   * Logout user
   */
  public logout(): void {
    this.deleteTokenFromStorage();
    this.userSubj.next(undefined);
  }

  /**
   * Return isAuthenticated
   * return {{ boolean }}
   */
  public isAuthenticated(): Observable<boolean> {
    const isAuthenticatedToken: boolean = !isNil(this.getTokenFromStorage());

    if (isAuthenticatedToken) {
      this.getUser()
        .pipe(take(1))
        .subscribe();
    }

    return observableOf(isAuthenticatedToken);
  }

  /**
   * Return token
   */
  public getToken(): string {
    return this.getTokenFromStorage();
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
      switchMap(user => {
        this.userSubj.next(user);
        return observableOf(user);
      }),
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
