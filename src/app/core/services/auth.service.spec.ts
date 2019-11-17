import { TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { StorageService } from "./storage.service";
import { AuthService } from "./auth.service";

describe("Core.AuthService:", () => {
  let authService: AuthService;
  const storageServiceMock: jasmine.SpyObj<StorageService> = jasmine.createSpyObj("StorageService", [
    "getItems",
    "getItem",
    "setItem",
    "clearAll",
    "removeItem",
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: StorageService, useValue: storageServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    authService = TestBed.get(AuthService);
  });

  it("should be created", () => {
    expect(authService).toBeTruthy();
  });
});
