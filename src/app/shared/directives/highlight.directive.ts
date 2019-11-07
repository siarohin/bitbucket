import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
} from "@angular/core";
import isNil from "lodash/isNil";

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
  private creationDateBF: Date | number;
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
  public set creationDate(date: Date | number) {
    this.creationDateBF = date;
    this.highlight();
  }

  /**
   * Get creation date
   * Return {{ Date | number }}
   */
  public get creationDate(): Date | number {
    return this.creationDateBF;
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
    const schema: HighlightSchemas = this.getCourseSchema(
      this.creationDate,
    );

    for (const key in schema) {
      if (schema.hasOwnProperty(key) && schema[key]) {
        this.renderer.addClass(element, this.schemas[key]);
      }
    }
  }

  private getCourseSchema(date: Date | number): HighlightSchemas {
    if (!isNil(this.creationDate) && !isNil(this.topRated)) {
      const courseDateInMs: number =
        date instanceof Date ? date.valueOf() : date;
      const freshDaysInMs: number = DAYS_NUMBER * 24 * 60 * 60 * 1000;
      const currentDayInMs: number = Date.now();
      const differenceInMs: number = currentDayInMs - freshDaysInMs;

      const isFreshCourse: boolean =
        courseDateInMs < currentDayInMs &&
        courseDateInMs >= differenceInMs;
      const isPlannedCourse: boolean =
        courseDateInMs > currentDayInMs;
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
