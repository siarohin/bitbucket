import { TestBed, async } from "@angular/core/testing";

import { CoursesListService } from "./courses-list.service";
import { CourseItemModel } from "./models/index";
import { DEFAULT_CONFIG } from "./courses.config";

describe("Core.CoursesListService:", () => {
  let courseListService: CoursesListService;

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

  it("should init coursesList$", async(() => {
    const coursesList: Array<CourseItemModel> = DEFAULT_CONFIG;
    courseListService.coursesList$.subscribe(value => {
      expect(value).toEqual(coursesList);
    });
  }));
});
