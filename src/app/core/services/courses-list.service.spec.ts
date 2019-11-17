import { TestBed, tick, fakeAsync } from "@angular/core/testing";

import { CoursesListService } from "./courses-list.service";
import { CourseItemModel } from "./models/index";
import { DEFAULT_CONFIG } from "./courses.config";

describe("Core.CoursesListService:", () => {
  let courseListService: CoursesListService;
  const coursesList: Array<CourseItemModel> = DEFAULT_CONFIG;

  beforeEach(() => {
    spyOn(Date, "now").and.returnValue(111111111);
    TestBed.configureTestingModule({
      providers: [CoursesListService],
    });

    courseListService = TestBed.get(CoursesListService);
  });

  it("should be created", () => {
    expect(courseListService).toBeTruthy();
  });

  it("should return coursesList$ on getSoursesList() call", fakeAsync(() => {
    courseListService.getCoursesList().subscribe(value => {
      expect(value).toEqual(coursesList);
    });
    tick();
  }));
});
