import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";

import { SpinnerService } from "./widgets/index";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private titleService: Title;
  private metaService: Meta;

  /**
   * public spinner service
   */
  public spinnerService: SpinnerService;

  constructor(titleService: Title, metaService: Meta, spinnerService: SpinnerService) {
    this.titleService = titleService;
    this.metaService = metaService;
    this.spinnerService = spinnerService;
  }

  /**
   * Set meta information for the page
   */
  public onActivate(routerOutlet: RouterOutlet) {
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }
}
