import { TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { StorageService } from "./storage.service";

describe("Core.StorageService:", () => {
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
      schemas: [NO_ERRORS_SCHEMA],
    });

    storageService = TestBed.get(StorageService);
  });

  it("should be created", () => {
    expect(storageService).toBeTruthy();
  });
});
