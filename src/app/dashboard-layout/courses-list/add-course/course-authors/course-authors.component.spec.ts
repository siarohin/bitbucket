import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CourseAuthorsComponent } from "./course-authors.component";

describe("CourseAuthorsComponent", () => {
  let component: CourseAuthorsComponent;
  let fixture: ComponentFixture<CourseAuthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAuthorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
