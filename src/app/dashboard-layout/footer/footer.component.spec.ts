import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { FooterComponent } from "./footer.component";

describe("FooterComponent:", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should contain div", () => {
    const div: HTMLDivElement = fixture.debugElement.query(By.css(".content")).nativeElement;
    expect(div).toBeTruthy();
    expect(div.childElementCount).toBe(1);
  });
});
