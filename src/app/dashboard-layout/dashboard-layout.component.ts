import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { UserFacade } from "../core";

/**
 * Dashboard layout component
 */
@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent implements OnInit {
  private titleService: Title;
  private metaService: Meta;
  private userFacade: UserFacade;

  constructor(titleService: Title, metaService: Meta, userFacade: UserFacade) {
    this.titleService = titleService;
    this.metaService = metaService;
    this.userFacade = userFacade;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.userFacade.getUser();
  }

  /**
   * Set meta information for the page
   */
  public onActivate(routerOutlet: RouterOutlet) {
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }
}
