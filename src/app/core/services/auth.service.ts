import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { publishReplay, refCount } from "rxjs/operators";
import assign from "lodash/assign";

import { StorageService } from "./storage.service";
import { UserAuthModel } from "./models/index";

/**
 * Authentication service
 */
@Injectable()
export class AuthService {
  private storageService: StorageService;
  private userSubj: BehaviorSubject<UserAuthModel> = new BehaviorSubject(undefined);
  private user$: Observable<UserAuthModel>;
  private isAuthenticatedSubj: BehaviorSubject<boolean> = new BehaviorSubject(undefined);
  private isAuthenticated$: Observable<boolean>;

  constructor(storageService: StorageService) {
    this.isAuthenticated$ = this.isAuthenticatedSubj.asObservable().pipe(publishReplay(1), refCount());
    this.user$ = this.userSubj.asObservable().pipe(publishReplay(1), refCount());
    this.storageService = storageService;
    this.updateInitialState();
  }

  /**
   * Login user
   */
  public logIn(user: UserAuthModel): void {
    this.updateUser(user);
    this.updateIsAuthenticated(true);
    this.storageService.setItem("user", user.email);
  }

  /**
   * Logout user
   */
  public logOut(): void {
    this.updateUser(undefined);
    this.updateIsAuthenticated(false);
    this.storageService.removeItem(["user"]);
  }

  /**
   * IsAuthenticated user
   * returns Observable<boolean>
   */
  public getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  /**
   * user info
   * returns Observable<UserAuthModel>
   */
  public getUserInfo(): Observable<UserAuthModel> {
    return this.user$;
  }

  /**
   * Update user info
   */
  private updateUser(user: UserAuthModel): void {
    this.userSubj.next(user);
  }

  /**
   * Update is authenticated user
   */
  private updateIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubj.next(isAuthenticated);
  }

  /**
   * Update initial state from local storage
   */
  private updateInitialState(): void {
    const email: string = this.storageService.getItem("user");
    const user: UserAuthModel = assign({}, { email });
    this.updateUser(user);
    this.updateIsAuthenticated(!!email);
  }
}
