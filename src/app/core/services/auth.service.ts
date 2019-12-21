import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of as observableOf } from "rxjs";
import { map, catchError } from "rxjs/operators";

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

  constructor(storageService: StorageService, http: HttpClient, @Inject(UsersAPI) usersUrl: string) {
    this.http = http;
    this.usersUrl = usersUrl;
    this.storageService = storageService;
  }

  /**
   * Authenticate user
   */
  public authenticate(auth: AuthenticationModel): Observable<TokenRequestModel> {
    const { login, password } = auth;
    const url = `${this.usersUrl}/${AuthApi.login}`;
    const body: string = JSON.stringify({
      login,
      password,
    });
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http
      .post<TokenRequestModel>(url, body, options)
      .pipe(catchError(() => observableOf(undefined)));
  }

  /**
   * Get user by token
   */
  public getUser(token: string): Observable<UserAuthModel> {
    const url = `${this.usersUrl}/${AuthApi.user}`;
    const body: string = JSON.stringify({
      token,
    });
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http.post<UserAuthModel>(url, body, options).pipe(
      map(user => user as UserAuthModel),
      catchError(() => observableOf(undefined)),
    );
  }

  /**
   * Return token for guard / interceptor from long-life storage
   */
  public getToken(): string {
    return this.storageService.getItem(TOKEN);
  }
}
