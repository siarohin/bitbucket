import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { publishReplay, refCount, map } from "rxjs/operators";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";

import { StorageService } from "./storage.service";
import { UserAuthModel, NameModel } from "./models/index";
import { ServicesModule } from "./services.module";
import { UsersAPI } from "./auth.config";

/**
 * Constant for token name
 */
const TOKEN = "fakeToken";

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
      map(user => (isNil(user) ? user : user.name)),
      publishReplay(1),
      refCount(),
    );
  }

  /**
   * Get user
   */
  public getUser(token: string = this.getTokenFromStorage()): Promise<UserAuthModel> {
    return this.http
      .get<Array<UserAuthModel>>(this.usersUrl, {
        params: { [TOKEN]: token },
      })
      .toPromise()
      .then(user => {
        this.userSubj.next(user[0]);
        return user[0];
      });
  }

  /**
   * Authenticate user
   */
  public authenticate(login: string, password: string): Promise<UserAuthModel | void> {
    return this.http
      .get<Partial<Array<UserAuthModel>>>(this.usersUrl, {
        params: {
          login,
          password,
        },
      })
      .toPromise()
      .then(user => {
        if (!isEmpty(user)) {
          const token: string = user[0].fakeToken;
          this.setTokenToStorage(token);
          return this.getUser(token);
        }
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
  public isAuthenticated(): boolean {
    const isAuthenticatedToken: boolean = !isNil(this.getTokenFromStorage());

    if (isAuthenticatedToken) {
      this.getUser();
    }

    return isAuthenticatedToken;
  }

  /**
   * Return token
   */
  public getToken(): string {
    return this.getTokenFromStorage();
  }

  /**
   * Get fakeToken from storage
   */
  private getTokenFromStorage(): string {
    return this.storageService.getItem(TOKEN);
  }

  /**
   * Set fakeToken to storage
   */
  private setTokenToStorage(fakeToken: string): void {
    this.storageService.setItem(TOKEN, fakeToken);
  }

  /**
   * delete fakeToken from storage
   */
  private deleteTokenFromStorage(): void {
    this.storageService.removeItem([TOKEN]);
  }
}
