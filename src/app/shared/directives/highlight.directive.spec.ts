import { Component, DebugElement } from "@angular/core";
import {
  ComponentFixture,
  async,
  TestBed,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import assign from "lodash/assign";

import { HighlightDirective } from "./highlight.directive";
import { CourseItemModel } from "../../core/index";
import { HighlightSchemas } from "../models/index";

describe("SharedModule.HighlightDirective:", () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: DebugElement;

  beforeEach(() => {
    spyOn(Date, "now").and.returnValue(1573131768661); // November, 7
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    element = fixture.debugElement.query(By.css("[appHighlight]"));

    fixture.detectChanges();
  }));

  it("should set planned property to classList", () => {
    // November, 29
    const testData: { [key: string]: Date | number } = {
      creationDate: new Date(2019, 10, 29, 14, 0, 0, 0),
    };
    testComponent.course = assign({}, testComponent.course, testData);
    fixture.detectChanges();

    const expected: string | boolean =
      testComponent.schemas.isPlannedCourse;
    expect(element.nativeElement.classList).toContain(expected);
  });

  it("should set fresh property to classList", () => {
    // November, 1
    const testData: { [key: string]: Date | number } = {
      creationDate: new Date(2019, 10, 1, 14, 0, 0, 0),
    };
    testComponent.course = assign({}, testComponent.course, testData);
    fixture.detectChanges();

    const expected: string | boolean =
      testComponent.schemas.isFreshCourse;
    expect(element.nativeElement.classList).toContain(expected);
  });

  it("should not set property to classList", () => {
    // prettier-ignore
    const testData: {[key: string]: Date | number} = {creationDate: undefined};
    testComponent.course = assign({}, testComponent.course, testData);
    fixture.detectChanges();

    const expectedSchemas: HighlightSchemas = testComponent.schemas;
    const { isFreshCourse, isPlannedCourse } = expectedSchemas;
    expect(element.nativeElement.classList).not.toContain(
      isFreshCourse,
    );
    expect(element.nativeElement.classList).not.toContain(
      isPlannedCourse,
    );
  });

  it("should set top rated property to classList", () => {
    const testData: { [key: string]: boolean | Date | number } = {
      isTopRated: true,
      creationDate: new Date(2019, 10, 1, 14, 0, 0, 0),
    };
    testComponent.course = assign({}, testComponent.course, testData);
    fixture.detectChanges();

    const expected: string | boolean =
      testComponent.schemas.isTopRated;
    expect(element.nativeElement.classList).toContain(expected);
  });
});

@Component({
  template: `
    <div
      appHighlight
      [highlight-creation-date]="course?.creationDate"
      [highlight-top-rated]="course?.isTopRated"
      [highlight-schemas]="schemas"
    ></div>
  `,
})
class TestComponent {
  public course: CourseItemModel = {
    id: 1,
    title: "Book Club",
    creationDate: undefined,
    duration: 20,
    description: "Have you been wanting to join a book club.",
    isTopRated: undefined,
  };

  public schemas: HighlightSchemas = {
    isFreshCourse: "highlight-schema-fresh",
    isPlannedCourse: "highlight-schema-planned",
    isTopRated: "highlight-schema-top-rated",
  };
}
