import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { DeleteCourseComponent } from "./delete-course.component";

xdescribe("DialogOverviewComponent", () => {
  let component: DeleteCourseComponent;
  let fixture: ComponentFixture<DeleteCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCourseComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
