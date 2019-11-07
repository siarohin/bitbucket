import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { CoursesListService, CourseItemModel } from "../core/index";

describe("DashboardLayoutComponent:", () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  const courseListMock: Array<CourseItemModel> = [
    {
      id: 1,
      title: "Book Club",
      creationDate: new Date(2019, 10, 29, 14, 0, 0, 0),
      duration: 20,
      description: "Have you been wanting to join a book club",
    },
  ];

  const courseListServiceMock: jasmine.SpyObj<
    CoursesListService
  > = jasmine.createSpyObj("CoursesListService", ["coursesList$"]);

  const coursesList$: BehaviorSubject<
    Array<CourseItemModel>
  > = new BehaviorSubject(courseListMock);

  courseListServiceMock.coursesList$ = coursesList$;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLayoutComponent],
      providers: [
        {
          provide: CoursesListService,
          useValue: courseListServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init coursesList$", fakeAsync(() => {
    component.coursesList$.subscribe(value => {
      expect(value).toEqual(courseListMock);
    });
    tick();
  }));

  it("onSearchButtonClick() should set inputValue property", () => {
    const expected = "Have you been wanting to join a book club";
    component.onSearchButtonClick(expected);
    fixture.detectChanges();
    expect(component.inputValue).toEqual(expected);
  });
});
