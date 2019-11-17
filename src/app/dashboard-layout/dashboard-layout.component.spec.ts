import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of as observableOf } from "rxjs";

import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { CoursesListService, AuthService, CourseItemModel } from "../core/index";

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

  const courseListServiceMock: jasmine.SpyObj<CoursesListService> = jasmine.createSpyObj(
    "CoursesListService",
    ["getCoursesList"],
  );

  const authServiceMock: jasmine.SpyObj<AuthService> = jasmine.createSpyObj("AuthService", [
    "getIsAuthenticated",
  ]);

  courseListServiceMock.getCoursesList.and.returnValue(observableOf(courseListMock));
  authServiceMock.getIsAuthenticated.and.returnValue(observableOf(true));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLayoutComponent],
      providers: [
        {
          provide: CoursesListService,
          useValue: courseListServiceMock,
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
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

  it("onSearchButtonClick() should set inputValue property", () => {
    const expected = "Have you been wanting to join a book club";
    component.onSearchButtonClick(expected);
    fixture.detectChanges();
    expect(component.inputValue).toEqual(expected);
  });
});
