import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Component } from "@angular/core";
import { By } from "@angular/platform-browser";

import { CourseItemComponent } from "./course-item.component";
import { SharedModule } from "../../../shared/index";
import { CourseItemModel } from "../../../core/index";

describe("CourseItemComponent:", () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  const mockDate: Date = new Date(2019, 10, 29, 14, 0, 0, 0);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, CourseItemComponent],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    console.log = jasmine.createSpy("log");
    jasmine.clock().install();
    jasmine.clock().mockDate(mockDate);

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();

    component = fixture.debugElement.query(By.directive(CourseItemComponent)).componentInstance;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init course input", () => {
    expect(component.course).toEqual(testComponent.course);
  });

  it("should init isLast input", () => {
    expect(component.isLast).toEqual(testComponent.isLast);
  });

  /**
   * https://angular.io/guide/testing#component-test-basics
   */
  it("shoud call onEditBtnClick on button click()", () => {
    const buttonsDiv = fixture.debugElement.query(By.css(".buttons")).children;
    const expected = `Button 'Edit' was clicked`;

    const editBtn: HTMLButtonElement = buttonsDiv[0].nativeElement;
    const onEditBtnClickSpy: jasmine.Spy = spyOn(component, "onEditBtnClick").and.callThrough();

    editBtn.click();
    fixture.detectChanges();
    expect(onEditBtnClickSpy).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(expected);
  });

  it("shoud raise the deleteButtonClick event on call onDeleteBtnClick()", () => {
    const buttonsDiv = fixture.debugElement.query(By.css(".buttons")).children;
    const deleteBtn: HTMLButtonElement = buttonsDiv[1].nativeElement;
    const onDeleteBtnClickSpy: jasmine.Spy = spyOn(component, "onDeleteBtnClick").and.callThrough();
    const onDeleteCourseSpy: jasmine.Spy = spyOn(testComponent, "onDeleteCourse").and.callThrough();

    component.deleteButtonClick.subscribe((courseId: number) => {
      expect(courseId).toBe(testComponent.course.id);
    });

    deleteBtn.click();
    fixture.detectChanges();

    expect(onDeleteBtnClickSpy).toHaveBeenCalled();
    expect(onDeleteCourseSpy).toHaveBeenCalledWith(testComponent.course.id);
  });
});

@Component({
  template: `
    <app-course-item
      [course]="course"
      [isLast]="isLast"
      (deleteButtonClick)="onDeleteCourse($event)"
    ></app-course-item>
  `,
})
class TestComponent {
  public course: CourseItemModel = {
    id: 1,
    name: "Book Club",
    date: new Date(2019, 10, 29, 14, 0, 0, 0),
    length: 20,
    description: "Have you been wanting to join a book club.",
  };

  public isLast = false;

  public onDeleteCourse(): void {}
}
