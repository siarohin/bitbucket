import { Pipe, PipeTransform } from "@angular/core";

import isNaN from "lodash/isNaN";

/**
 * Convert time in minutes to time in hour and minutes
 */
@Pipe({
  name: "convertTime",
})
export class ConvertTimePipe implements PipeTransform {
  transform(value: string | number): string {
    const digiValue: number = Number(value);
    const isValid: boolean = !!value && !isNaN(digiValue);

    if (isValid) {
      const hour: number = Math.trunc(digiValue / 60);
      const min: number = digiValue % 60;

      if (min !== 0) {
        return hour > 0 ? `${hour}h ${min}min` : `${min}min`;
      } else {
        return `${hour}h ${min}${min}min`;
      }
    } else {
      return "";
    }
  }
}
