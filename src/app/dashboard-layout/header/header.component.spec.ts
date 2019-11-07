import {
  async,
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

import { HeaderComponent } from "./header.component";

describe("HeaderComponent:", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
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
    const div: HTMLDivElement = fixture.debugElement.query(
      By.css(".header"),
    ).nativeElement;
    expect(div).toBeTruthy();
    expect(div.childElementCount).toBe(2);
  });
});
