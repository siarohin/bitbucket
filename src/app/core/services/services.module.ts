import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StorageService } from "./storage.service";
import { CoursesAPIProvider } from "./courses-list.config";
import { UsersAPIProvider } from "./auth.config";
import { AuthorsAPIProvider } from "./authors-list.config";

@NgModule({
  providers: [CoursesAPIProvider, UsersAPIProvider, AuthorsAPIProvider, StorageService],
  imports: [CommonModule],
})
export class ServicesModule {}
