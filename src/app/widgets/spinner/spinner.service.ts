import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { publishReplay, refCount, debounceTime, takeUntil } from "rxjs/operators";

/**
 * Service that controls spinner behavior
 */
@Injectable()
export class SpinnerService implements OnDestroy {
  private destroySubj: Subject<boolean> = new Subject();
  private visibleSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Spinner state
   */
  public isVisible$: Observable<boolean>;

  constructor() {
    this.isVisible$ = this.visibleSubj.asObservable().pipe(
      // debounceTime using to fix error ExpressionChangedAfterItHasBeenCheckedError
      debounceTime(100),
      takeUntil(this.destroySubj),
      publishReplay(1),
      refCount(),
    );
  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.destroySubj.next(true);
    this.destroySubj.unsubscribe();
  }

  /**
   * hide spinner
   */
  public hideSpinner(): void {
    this.visibleSubj.next(false);
  }

  /**
   * show spinner
   */
  public showSpinner(): void {
    this.visibleSubj.next(true);
  }
}
