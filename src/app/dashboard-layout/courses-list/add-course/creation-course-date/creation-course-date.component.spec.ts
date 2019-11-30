import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreationCourseDateComponent } from "./creation-course-date.component";

describe("CreationCourseDateComponent", () => {
  let component: CreationCourseDateComponent;
  let fixture: ComponentFixture<CreationCourseDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreationCourseDateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationCourseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
