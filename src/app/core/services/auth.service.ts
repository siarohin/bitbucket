import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, of as observableOf } from "rxjs";
import { publishReplay, refCount, map } from "rxjs/operators";
import isNil from "lodash/isNil";

import { StorageService } from "./storage.service";
import { UserAuthModel, NameModel, TokenRequestModel } from "./models/index";
import { ServicesModule } from "./services.module";
import { UsersAPI } from "./auth.config";
import { SpinnerService } from "../../widgets/index";

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
  private spinner: SpinnerService;

  /**
   * Observable<NameModel>
   */
  public user$: Observable<NameModel>;

  constructor(
    storageService: StorageService,
    http: HttpClient,
    @Inject(UsersAPI) usersUrl: string,
    spinner: SpinnerService,
  ) {
    this.http = http;
    this.usersUrl = usersUrl;
    this.storageService = storageService;
    this.user$ = this.userSubj.asObservable().pipe(
      map(user => (isNil(user) ? undefined : user.name)),
      publishReplay(1),
      refCount(),
    );
    this.spinner = spinner;
  }

  /**
   * Authenticate user
   */
  public authenticate(login: string, password: string): Promise<UserAuthModel | Observable<never>> {
    this.spinner.show();

    const url = `${this.usersUrl}/${AuthApi.login}`;
    const body: string = JSON.stringify({
      login,
      password,
    });
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http
      .post<Partial<UserAuthModel>>(url, body, options)
      .toPromise()
      .then((response: TokenRequestModel) => {
        const { token } = response;
        this.setTokenToStorage(token);
        this.spinner.hide();
        return this.getUser(token);
      })
      .catch(err => {
        this.handleError(err);
        this.spinner.hide();
        return throwError("Please try again later");
      });
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
      this.getUser();
    }

    return observableOf(isAuthenticatedToken);
  }

  /**
   * Return token
   */
  public getToken(): string {
    return this.getTokenFromStorage();
  }

  private getUser(token: string = this.getTokenFromStorage()): Promise<UserAuthModel | Observable<never>> {
    const url = `${this.usersUrl}/${AuthApi.user}`;
    const body: string = JSON.stringify({
      token,
    });
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http
      .post<UserAuthModel>(url, body, options)
      .toPromise()
      .then(user => {
        this.userSubj.next(user);
        return user;
      })
      .catch(err => {
        this.handleError(err);
        return throwError("Please try again later");
      });
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
