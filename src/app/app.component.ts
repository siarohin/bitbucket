import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";

import { SpinnerService } from "./widgets/index";
import { DateAdapter } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  private titleService: Title;
  private metaService: Meta;
  private translate: TranslateService;
  private dateAdapter: DateAdapter<Date>;

  /**
   * public spinner service
   */
  public spinnerService: SpinnerService;

  constructor(
    titleService: Title,
    metaService: Meta,
    spinnerService: SpinnerService,
    translate: TranslateService,
    dateAdapter: DateAdapter<Date>,
  ) {
    this.titleService = titleService;
    this.metaService = metaService;
    this.spinnerService = spinnerService;
    this.dateAdapter = dateAdapter;

    this.translate = translate;
    this.translate.addLangs(["en", "ru"]);
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }

  /**
   * Set meta information for the page
   */
  public onActivate(routerOutlet: RouterOutlet) {
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }

  /**
   * set language
   */
  public onLanguageChange(language: string) {
    this.translate.use(language);
    this.dateAdapter.setLocale(language);
  }
}
