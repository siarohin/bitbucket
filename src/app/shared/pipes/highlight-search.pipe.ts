import { Pipe, PipeTransform } from "@angular/core";

/**
 * Highlight pipe that select searching value
 */
@Pipe({
  name: "highlightSearch",
})
export class HighlightSearch implements PipeTransform {
  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    const re: RegExp = new RegExp(args, "gi");
    return value.replace(re, "<mark>$&</mark>");
  }
}
