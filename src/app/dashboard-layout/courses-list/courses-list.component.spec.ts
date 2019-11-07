import {
  async,
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import last from "lodash/last";

import { CoursesListComponent } from "./courses-list.component";
import { CourseItemModel } from "../../core/index";

describe("CoursesListComponent", () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  const coursesList: Array<CourseItemModel> = [
    {
      id: 1,
      title: "Book Club",
      creationDate: new Date(2019, 10, 29, 14, 0, 0, 0),
      duration: 20,
      description: "Have you been wanting to join a book club.",
    },
    {
      id: 2,
      title: "Book Club",
      creationDate: new Date(2020, 10, 29, 14, 0, 0, 0),
      duration: 40,
      description: "Have you been wanting to join a book club.",
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    console.log = jasmine.createSpy("log");
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  /**
   * https://angular.io/guide/testing#component-test-basics
   */
  it("onLoadBtnClick() should add text to console.log", () => {
    const expected = `Button 'Load' was clicked`;
    expect(console.log).not.toHaveBeenCalled();
    component.onLoadBtnClick();
    expect(console.log).toHaveBeenCalledWith(expected);
  });

  it("coursesList input should set lastItem", async(() => {
    component.coursesList = coursesList;
    const expected: CourseItemModel = last(coursesList);
    expect(component.lastItem).toEqual(expected);
  }));

  it("onDeleteCourse() should add text to console.log", () => {
    const expected: number = coursesList[0].id;
    component.onDeleteCourse(expected);
    expect(console.log).toHaveBeenCalledWith(expected);
  });
});
