// tslint:disable:no-conflicting-lifecycle
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";

/**
 * Simple component that represents footer
 */
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private language: string;

  /**
   * available languages
   */
  public languageMap: Array<string> = ["en", "ru"];

  /**
   * on language change
   */
  @Output()
  public languageChange: EventEmitter<string> = new EventEmitter();

  /**
   * emit next language
   */
  public onLanguageChange(language: string): void {
    if (this.language === language) {
      return;
    }

    this.language = language;
    this.languageChange.emit(language);
  }
}
