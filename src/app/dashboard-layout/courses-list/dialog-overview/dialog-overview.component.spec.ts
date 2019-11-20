import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { DialogOverviewComponent } from "./dialog-overview.component";

xdescribe("DialogOverviewComponent", () => {
  let component: DialogOverviewComponent;
  let fixture: ComponentFixture<DialogOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogOverviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
