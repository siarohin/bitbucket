import { Pipe, PipeTransform } from "@angular/core";

/**
 * Convert time in minutes to time in hour and minutes
 */
@Pipe({
  name: "convertTime",
})
export class ConvertTimePipe implements PipeTransform {
  transform(value: number): string {
    if (!!value) {
      const hour: number = Math.trunc(value / 60);
      const min: number = value % 60;

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
