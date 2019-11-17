import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of as observableOf } from "rxjs";

import { AuthService } from "../../core/index";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent:", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authServiceMock: jasmine.SpyObj<AuthService> = jasmine.createSpyObj("AuthService", [
    "getIsAuthenticated",
    "getUserInfo",
  ]);

  authServiceMock.getIsAuthenticated.and.returnValue(observableOf(true));
  authServiceMock.getUserInfo.and.returnValue(observableOf(undefined));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should contain div, logo, app-user-entity", () => {
    const div: HTMLDivElement = fixture.debugElement.query(By.css(".header")).nativeElement;
    expect(div).toBeTruthy();
    expect(div.childElementCount).toBe(2);
  });
});
