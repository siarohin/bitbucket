import {
  async,
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { UserEntityComponent } from "./user-entity.component";

describe("UserEntityComponent:", () => {
  let component: UserEntityComponent;
  let fixture: ComponentFixture<UserEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserEntityComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
