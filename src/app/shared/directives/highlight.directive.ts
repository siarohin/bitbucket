import { Directive, ElementRef, Renderer2, Input } from "@angular/core";
import isNil from "lodash/isNil";
import keys from "lodash/keys";

import { HighlightSchemas } from "../models/index";

/**
 * Number of days for fresh course item
 */
const DAYS_NUMBER = 14;

/**
 * Highlight directive
 * Set class on course item that depends of created date and current date
 */
@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  private elementRef: ElementRef;
  private renderer: Renderer2;
  private dateBF: Date | number;
  private topRatedBF: boolean;

  /**
   * Schemas for course item
   */
  @Input("highlight-schemas") // tslint:disable-next-line:no-input-rename
  public schemas: HighlightSchemas;

  /**
   * Set creation date
   * Props {{ Date | number }}
   */
  @Input("highlight-creation-date")
  public set date(date: Date | number) {
    this.dateBF = date;
    this.highlight();
  }

  /**
   * Get creation date
   * Return {{ Date | number }}
   */
  public get date(): Date | number {
    return this.dateBF;
  }

  /**
   * Set top rated flag
   * Props {{ boolean }}
   */
  @Input("highlight-top-rated")
  public set topRated(value: boolean) {
    this.topRatedBF = !!value;
    this.highlight();
  }

  /**
   * Get top rated flag
   * Return {{ boolean }}
   */
  public get topRated(): boolean {
    return this.topRatedBF;
  }

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    this.elementRef = elementRef;
    this.renderer = renderer;
  }

  private highlight(): void {
    const element: HTMLElement = this.elementRef.nativeElement;
    const schema: HighlightSchemas = this.getCourseSchema(this.date);

    keys(schema).forEach((key: string) => {
      if (key && schema[key]) {
        this.renderer.addClass(element, this.schemas[key]);
      }
    });
  }

  private getCourseSchema(value: Date | number): HighlightSchemas {
    if (!isNil(this.date) && !isNil(this.topRated)) {
      const courseDateInMs: number = value instanceof Date ? value.valueOf() : value;
      const freshDaysInMs: number = DAYS_NUMBER * 24 * 60 * 60 * 1000;
      const currentDayInMs: number = Date.now();
      const differenceInMs: number = currentDayInMs - freshDaysInMs;

      const isFreshCourse: boolean = courseDateInMs < currentDayInMs && courseDateInMs >= differenceInMs;
      const isPlannedCourse: boolean = courseDateInMs > currentDayInMs;
      const isTopRated: boolean = this.topRated;

      const schema: HighlightSchemas = {
        isFreshCourse,
        isPlannedCourse,
        isTopRated,
      };
      return schema;
    }
  }
}
