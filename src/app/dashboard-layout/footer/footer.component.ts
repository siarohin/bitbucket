// tslint:disable:no-conflicting-lifecycle
import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from "@angular/core";

/**
 * TODO: Remove unnecessary hooks after task will be checked
 * Place console.log statement in hooks
 * (https://angular.io/docs/ts/latest/guide/lifecyclehooks.html)
 * to understand ordering.
 */
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  constructor() {
    console.log("constructor was called");
  }

  public ngOnChanges(): void {
    console.log("ngOnChanges was called");
  }

  public ngOnInit(): void {
    console.log("ngOnInit was called");
  }

  public ngDoCheck(): void {
    console.log("ngDoCheck was called");
  }

  public ngAfterContentInit(): void {
    console.log("ngAfterContentInit was called");
  }

  public ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked was called");
  }

  public ngAfterViewInit(): void {
    console.log("ngAfterViewInit was called");
  }

  public ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked was called");
  }

  public ngOnDestroy(): void {
    console.log("ngOnDestroy was called");
  }
}
