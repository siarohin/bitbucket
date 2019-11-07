import {
  async,
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA, Component } from "@angular/core";
import sortBy from "lodash/sortBy";

import {
  CoursesListComponent,
  SORT_PARAMETER,
} from "./courses-list.component";
import { CourseItemModel } from "../../core/index";
import { OrderByPipe } from "../../shared/index";

describe("CoursesListComponent:", () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, CoursesListComponent],
      providers: [OrderByPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    console.log = jasmine.createSpy("log");
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();

    component = fixture.debugElement.query(
      By.directive(CoursesListComponent),
    ).componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init coursesList input when inputValue is not defined", () => {
    testComponent.inputValue = undefined;
    fixture.detectChanges();
    const expected: Array<CourseItemModel> = sortBy(
      testComponent.coursesList,
      SORT_PARAMETER.invalid,
    );
    expect(component.coursesList).toEqual(expected);
  });

  it("should init coursesList input when inputValue is defined", () => {
    testComponent.inputValue = "Acadd sddc";
    fixture.detectChanges();
    const expected: Array<CourseItemModel> = sortBy(
      testComponent.coursesList,
      SORT_PARAMETER.valid,
    );
    expect(component.coursesList).toEqual(expected);
  });

  it("should init inputValue input", () => {
    expect(component.inputValue).toEqual(testComponent.inputValue);
  });

  it("onLoadBtnClick() should add text to console.log", () => {
    const expected = `Button 'Load' was clicked`;
    expect(console.log).not.toHaveBeenCalled();
    component.onLoadBtnClick();
    expect(console.log).toHaveBeenCalledWith(expected);
  });

  it("onDeleteCourse() should add text to console.log", () => {
    const expected: number = testComponent.coursesList[0].id;
    component.onDeleteCourse(expected);
    expect(console.log).toHaveBeenCalledWith(expected);
  });
});

@Component({
  template: `
    <app-courses-list
      [coursesList]="coursesList"
      [inputValue]="inputValue"
    ></app-courses-list>
  `,
})
class TestComponent {
  public coursesList: Array<CourseItemModel> = [
    {
      id: 1,
      title: "Book Club",
      creationDate: new Date(2019, 10, 29, 14, 0, 0, 0),
      duration: 20,
      description: "Have you been wanting to join a book club.",
    },
    {
      id: 2,
      title: "Alphabet",
      creationDate: new Date(2020, 10, 29, 14, 0, 0, 0),
      duration: 40,
      description: "Have you been wanting to join a book club.",
    },
  ];

  public inputValue = undefined;
}
