import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, tap, delay } from "rxjs/operators";

import { SpinnerService } from "../../widgets/index";
import { DELAY_TIME } from "../constants";

/**
 * Loader interceptor
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private spinnerService: SpinnerService;

  constructor(spinnerService: SpinnerService) {
    this.spinnerService = spinnerService;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => this.spinnerService.showSpinner()),
      delay(DELAY_TIME),
      finalize(() => this.spinnerService.hideSpinner()),
    );
  }
}
