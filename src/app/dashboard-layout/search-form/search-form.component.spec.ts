import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { SearchFormComponent } from "./search-form.component";

describe("SearchFormComponent:", () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call onBtnClick() with input.value", () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector("input");
    const buttonElement: HTMLButtonElement = hostElement.querySelector("button");
    const onBtnClickSpy: jasmine.Spy = spyOn(component, "onBtnClick").and.callThrough();

    nameInput.value = "quick BROWN fOx";
    buttonElement.click();

    fixture.detectChanges();

    expect(onBtnClickSpy).toHaveBeenCalledWith(nameInput.value);
  });

  it("shoud raise the searchButtonClick event on call onBtnClick()", () => {
    const value = "quick BROWN fOx";

    component.searchButtonClick.subscribe((inputValue: string) => {
      expect(inputValue).toBe(value);
    });
    component.onBtnClick(value);
  });
});
