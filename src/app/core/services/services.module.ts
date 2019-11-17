import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthService } from "./auth.service";
import { CoursesListService } from "./courses-list.service";
import { StorageService } from "./storage.service";

@NgModule({
  providers: [AuthService, CoursesListService, StorageService],
  imports: [CommonModule],
})
export class ServicesModule {}
