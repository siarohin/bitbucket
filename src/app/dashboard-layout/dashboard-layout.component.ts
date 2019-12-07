import { Component } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";

import { CoursesListService } from "../core/index";
import isNil from "lodash/isNil";

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
  private coursesListService: CoursesListService;

  /**
   * course title
   */
  public courseTitle: string;

  constructor(titleService: Title, metaService: Meta, coursesListService: CoursesListService) {
    this.titleService = titleService;
    this.metaService = metaService;
    this.coursesListService = coursesListService;
  }

  /**
   * User's input value
   */
  public inputValue: string;

  /**
   * User's input on search button click
   */
  public onSearchButtonClick(value: string): void {
    this.inputValue = value;
  }

  /**
   * Set meta information for the page
   */
  public onActivate(routerOutlet: RouterOutlet) {
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);

    const paramsId: string = routerOutlet.activatedRoute.snapshot.params.id;
    this.courseTitle = paramsId ? this.coursesListService.getCourseItem(+paramsId).title : "";
  }
}
