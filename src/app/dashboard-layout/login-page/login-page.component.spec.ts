import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";

import { LoginPageComponent } from "./login-page.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("LoginPageComponent", () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
