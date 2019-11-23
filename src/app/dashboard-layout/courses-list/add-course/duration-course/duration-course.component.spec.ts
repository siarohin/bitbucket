import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DurationCourseComponent } from "./duration-course.component";

describe("DurationCourseComponent", () => {
  let component: DurationCourseComponent;
  let fixture: ComponentFixture<DurationCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DurationCourseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
