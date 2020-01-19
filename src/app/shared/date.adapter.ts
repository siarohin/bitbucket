import { NativeDateAdapter } from "@angular/material";

/**
 * Custom Date formats
 */
export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: "short", year: "numeric", day: "numeric" },
  },
  display: {
    dateInput: "input",
    monthYearLabel: "inputMonth",
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" },
  },
};

/**
 * Custom Date adapter
 */
export class AppDateAdapter extends NativeDateAdapter {
  public parse(value: any): Date | null {
    if (typeof value === "string" && value.indexOf("/") > -1) {
      const str: Array<string> = value.split("/");
      const year: number = Number(str[2]);
      const month: number = Number(str[1]) - 1;
      const date: number = Number(str[0]);
      return new Date(year, month, date);
    }

    const timestamp = typeof value === "number" ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  public format(date: Date, displayFormat: string): string {
    if (displayFormat == "input") {
      let day: number = date.getDate();
      let month: number = date.getMonth() + 1;
      let year: number = date.getFullYear();
      return this._to2digit(day) + "/" + this._to2digit(month) + "/" + year;
    } else if (displayFormat == "inputMonth") {
      let month: number = date.getMonth() + 1;
      let year: number = date.getFullYear();
      return this._to2digit(month) + "/" + year;
    } else {
      return date.toDateString();
    }
  }

  private _to2digit(n: number) {
    return ("00" + n).slice(-2);
  }
}
