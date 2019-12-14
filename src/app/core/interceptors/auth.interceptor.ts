import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import isNil from "lodash/isNil";

import { AuthService } from "../services/index";

/**
 * Auth interceptor
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest: HttpRequest<any>;

    if (!isNil(this.authService.getToken())) {
      const token: string = this.authService.getToken();
      clonedRequest = req.clone({
        headers: req.headers.set("Authorization", token),
      });
    } else {
      clonedRequest = req;
    }

    return next.handle(clonedRequest);
  }
}
