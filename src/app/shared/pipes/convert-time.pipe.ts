import { Pipe, PipeTransform } from "@angular/core";

import isNaN from "lodash/isNaN";
import { TranslateService } from "@ngx-translate/core";

/**
 * Convert time in minutes to time in hour and minutes
 */
@Pipe({
  name: "convertTime",
})
export class ConvertTimePipe implements PipeTransform {
  private translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  public transform(value: string | number): string {
    const digiValue: number = Number(value);
    const isValid: boolean = !!value && !isNaN(digiValue);
    const h: string = this.translate.instant("libs.date.h");
    const m: string = this.translate.instant("libs.date.min");

    if (isValid) {
      const hour: number = Math.trunc(digiValue / 60);
      const min: number = digiValue % 60;

      if (min !== 0) {
        return hour > 0 ? `${hour}${h} ${min}${m}` : `${min}${m}`;
      } else {
        return `${hour}${h} ${min}${min}${m}`;
      }
    } else {
      return "";
    }
  }
}
