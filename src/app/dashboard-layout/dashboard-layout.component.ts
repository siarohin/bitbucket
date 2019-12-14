import { Component } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";

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

  constructor(titleService: Title, metaService: Meta) {
    this.titleService = titleService;
    this.metaService = metaService;
  }

  /**
   * Set meta information for the page
   */
  public onActivate(routerOutlet: RouterOutlet) {
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }
}
