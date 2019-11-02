import { TestBed } from "@angular/core/testing";

import { CoursesListService } from "./courses-list.service";

describe("CoursesListService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CoursesListService = TestBed.get(CoursesListService);
    expect(service).toBeTruthy();
  });
});
