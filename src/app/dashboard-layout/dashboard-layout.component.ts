import { Component } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";

import { SpinnerService } from "../widgets/index";

/**
 * Dashboard layout component
 */
@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent {
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
